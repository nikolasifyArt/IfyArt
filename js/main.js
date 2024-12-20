import { Carousel } from './Carousel.js';
import { Navigation } from './navigation.js';
import { ThreeSlider } from './three-slider.js';
import { Effects } from './effects.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation
  const navigation = new Navigation();

  // Initialize Three.js slider
  const threeSlider = new ThreeSlider();
  const imageUrls = [
    './documents/1.png',
    './documents/2.jpg',
    './documents/3.jpg',
    './documents/4.jpg',
    './documents/Blind Love.jpg',
    './documents/5.jpg',
    './documents/6.jpg',
    './documents/7.jpg',
    './documents/8.jpg',
    './documents/9.jpg',
    './documents/10.jpg'
  ];
  threeSlider.init('slider', imageUrls);

  // Apply effects
  Effects.applyBlurAndFilter();
});