// Navigation menu functionality
export class Navigation {
    constructor() {
      this.navMenu = document.querySelector('.nav-menu');
      this.hamburger = document.querySelector('.hamburger');
      this.setupEventListeners();
    }
  
    async animateMenuIn() {
      this.navMenu.classList.remove('fadeOut');
      this.navMenu.classList.add('fadeIn', 'show');
    }
  
    async animateMenuOut() {
      this.navMenu.classList.remove('fadeIn');
      this.navMenu.classList.add('fadeOut');
      await new Promise(resolve => setTimeout(resolve, 2500));
      this.navMenu.classList.remove('show');
    }
  
    setupEventListeners() {
      // Hamburger click
      this.hamburger.addEventListener('click', async () => {
        if (this.navMenu.classList.contains('show')) {
          await this.animateMenuOut();
        } else {
          await this.animateMenuIn();
        }
      });
  
      // Mouse leave
      this.navMenu.addEventListener('mouseleave', async () => {
        await this.animateMenuOut();
      });
  
      // Outside click
      document.addEventListener('click', async (event) => {
        const isClickInside = this.navMenu.contains(event.target) || 
                             this.hamburger.contains(event.target);
        if (!isClickInside) {
          await this.animateMenuOut();
        }
      });
  
      // Nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', async () => {
          await this.animateMenuOut();
        });
      });
    }
  }