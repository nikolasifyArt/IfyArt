// Visual effects and filters
export class Effects {
    static applyBlurAndFilter() {
      const elements = document.querySelectorAll("*");
      
      elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        const backgroundColor = style.backgroundColor;
        const backgroundImage = style.backgroundImage;
        const color = style.color;
  
        if (backgroundColor !== "rgba(0, 0, 0, 0)" ||
            backgroundImage !== "none" ||
            color !== "rgb(0, 0, 0)") {
          el.style.filter = "blur(5px) brightness(0.8)";
        }
      });
    }
  }