// Image slider functionality
export class Slider {
    constructor() {
      this.slider = document.querySelector(".slider");
      this.wrapper = document.querySelector(".wrapper");
      this.next = document.querySelector(".arrow-next");
      this.prev = document.querySelector(".arrow-prev");
      this.items = document.querySelectorAll(".item");
      this.currdeg = 0;
      this.active = 0;
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      this.next.addEventListener("click", () => this.handleNext());
      this.prev.addEventListener("click", () => this.handlePrev());
    }
  
    handleNext() {
      this.slider.classList.toggle("zoom");
      this.currdeg -= 120;
      this.active = this.active === this.items.length - 1 ? 0 : this.active + 1;
      this.toggle();
    }
  
    handlePrev() {
      this.slider.classList.toggle("zoom");
      this.currdeg += 120;
      this.active = this.active === 0 ? this.items.length - 1 : this.active - 1;
      this.toggle();
    }
  
    toggle() {
      setTimeout(() => {
        this.items.forEach(item => item.classList.remove("active"));
        this.items[this.active].classList.add("active");
        this.wrapper.style.transform = `rotateY(${this.currdeg}deg)`;
      }, 900);
  
      setTimeout(() => {
        this.slider.classList.toggle("zoom");
      }, 1900);
    }
  }