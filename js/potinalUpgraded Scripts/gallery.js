// Gallery functionality
const gallery = {
    init() {
      this.setupFilters();
      this.setupLightbox();
      this.setupLazyLoading();
    },
  
    setupFilters() {
      const categories = ['all', 'digital-art', 'illustrations', 'graphic-design'];
      const filterContainer = document.createElement('div');
      filterContainer.className = 'gallery-filters';
      
      categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.replace('-', ' ');
        button.dataset.category = category;
        button.addEventListener('click', () => this.filterImages(category));
        filterContainer.appendChild(button);
      });
  
      document.querySelector('.slider').before(filterContainer);
    },
  
    setupLightbox() {
      const images = document.querySelectorAll('.slide img');
      images.forEach(img => {
        img.addEventListener('click', (e) => {
          this.openLightbox(e.target.src);
        });
      });
    },
  
    setupLazyLoading() {
      const images = document.querySelectorAll('.slide img');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });
  
      images.forEach(img => {
        img.classList.add('lazy');
        img.dataset.src = img.src;
        img.src = '';
        imageObserver.observe(img);
      });
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => gallery.init());