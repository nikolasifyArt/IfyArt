import * as THREE from 'three';

export class ThreeSlider {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.textures = [];
    this.currentIndex = 0;
    this.isAnimating = false;
  }

  init(containerId, imageUrls) {
    const container = document.getElementById(containerId);
    this.setupRenderer(container);
    this.setupCamera();
    this.createImagePlanes(imageUrls);
    this.addEventListeners();
    this.animate();
  }

  setupRenderer(container) {
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);
  }

  setupCamera() {
    this.camera.position.z = 5;
  }

  createImagePlanes(imageUrls) {
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(3, 2);

    imageUrls.forEach((url, index) => {
      const texture = textureLoader.load(url);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: index === 0 ? 1 : 0
      });
      
      const plane = new THREE.Mesh(geometry, material);
      this.textures.push(plane);
      this.scene.add(plane);
    });
  }

  nextSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const current = this.textures[this.currentIndex];
    const next = this.textures[(this.currentIndex + 1) % this.textures.length];
    
    // Reset next slide position
    next.position.x = 5;
    next.material.opacity = 1;

    // Animate slides
    const animate = () => {
      current.position.x -= 0.1;
      next.position.x -= 0.1;
      current.material.opacity -= 0.02;

      if (current.position.x <= -5) {
        current.position.x = 5;
        current.material.opacity = 0;
        this.currentIndex = (this.currentIndex + 1) % this.textures.length;
        this.isAnimating = false;
        return;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  prevSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const current = this.textures[this.currentIndex];
    const prev = this.textures[this.currentIndex === 0 ? this.textures.length - 1 : this.currentIndex - 1];
    
    prev.position.x = -5;
    prev.material.opacity = 1;

    const animate = () => {
      current.position.x += 0.1;
      prev.position.x += 0.1;
      current.material.opacity -= 0.02;

      if (current.position.x >= 5) {
        current.position.x = -5;
        current.material.opacity = 0;
        this.currentIndex = this.currentIndex === 0 ? this.textures.length - 1 : this.currentIndex - 1;
        this.isAnimating = false;
        return;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  addEventListeners() {
    window.addEventListener('resize', () => {
      const container = this.renderer.domElement.parentElement;
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.nextSlide();
      if (e.key === 'ArrowLeft') this.prevSlide();
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.textures.forEach(plane => {
      plane.rotation.y += 0.001;
    });
    this.renderer.render(this.scene, this.camera);
  }
}