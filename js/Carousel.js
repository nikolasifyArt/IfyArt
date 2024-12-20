// Carousel functionality
export class Carousel {
    constructor(carouselId) {
      this.carousel = document.getElementById(carouselId);
      this.figures = this.carousel.getElementsByTagName("figure");
      this.currentIndex = 0;
      this.interval = 10000; // 10 seconds
    }
  
    init() {
      this.startAutoPlay();
    }
  
    showNextImage() {
      this.figures[this.currentIndex].classList.remove("active");
      this.currentIndex = (this.currentIndex + 1) % this.figures.length;
      this.figures[this.currentIndex].classList.add("active");
    }
  
    startAutoPlay() {
      setInterval(() => this.showNextImage(), this.interval);
    }
  }