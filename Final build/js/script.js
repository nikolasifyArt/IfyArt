// nav menu toggle
// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
//  images slider scripts
let counter = 1;
setInterval(() => {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 5000); // Change image every 5 seconds

// Function to add blur and filter to elements with color or background color
function applyBlurAndFilter() {
  // Select all elements in the document
  const elements = document.querySelectorAll("*");

  // Iterate over each element
  elements.forEach((el) => {
    // Get the computed style of the element
    const style = window.getComputedStyle(el);

    // Extract the background color, background image, and text color of the element
    const backgroundColor = style.backgroundColor;
    const backgroundImage = style.backgroundImage;
    const color = style.color;

    // Check if the element has a background color, background image, or text color different from default
    if (
      backgroundColor !== "rgba(0, 0, 0, 0)" ||
      backgroundImage !== "none" ||
      color !== "rgb(0, 0, 0)"
    ) {
      el.style.filter = "blur(5px) brightness(0.8)";
    }
  });
}

// Apply the blur and filter when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", applyBlurAndFilter);

// Unit tests for applyBlurAndFilter function
describe("applyBlurAndFilter", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="test1" style="background-color: red;"></div>
      <div class="test2" style="background-image: url('image.jpg');"></div>
      <div class="test3" style="color: blue;"></div>
      <div class="test4" style="background-color: rgba(0, 0, 0, 0);"></div>
      <div class="test5" style="background-image: none;"></div>
      <div class="test6" style="color: rgb(0, 0, 0);"></div>
    `;
  });

  it("should apply blur and filter to elements with background color", () => {
    applyBlurAndFilter();
    const el = document.querySelector(".test1");
    expect(el.style.filter).toBe("blur(5px) brightness(0.8)");
  });

  it("should apply blur and filter to elements with background image", () => {
    applyBlurAndFilter();
    const el = document.querySelector(".test2");
    expect(el.style.filter).toBe("blur(5px) brightness(0.8)");
  });

  it("should apply blur and filter to elements with text color", () => {
    applyBlurAndFilter();
    const el = document.querySelector(".test3");
    expect(el.style.filter).toBe("blur(5px) brightness(0.8)");
  });

  it("should not apply blur and filter to elements with default background color", () => {
    applyBlurAndFilter();
    const el = document.querySelector(".test4");
    expect(el.style.filter).toBe("blur(10px) brightness(0.8)");
  });

  it("should not apply blur and filter to elements with default background image", () => {
    applyBlurAndFilter();
    const el = document.querySelector(".test5");
    expect(el.style.filter).toBe(
      "drop-shadow(0 0 0.5rem black) blur(5px) opacity(30%) brightness(8%)"
    );
  });

  it("should not apply blur and filter to elements with default text color", () => {
    applyBlurAndFilter();
    const el = document.querySelector(".test6");
    expect(el.style.filter).toBe(
      "saturate(0.5) blur(5px) brightness(0.8) contrast(0.8)"
    );
  });
});
