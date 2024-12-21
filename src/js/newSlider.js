const slider = document.querySelector(".slider");
const wrapper = document.querySelector(".wrapper");
const next = document.querySelector(".arrow-next");
const prev = document.querySelector(".arrow-prev");
const item = document.querySelectorAll(".item");
let currdeg = 0;
let active = 0;

next.addEventListener("click", () => {
  slider.classList.toggle("zoom");

  currdeg -= 120;

  if (active === item.length - 1) {
    active = 0;
  } else {
    active++;
  }

  toggle();
});

prev.addEventListener("click", () => {
  slider.classList.toggle("zoom");

  currdeg += 120;

  if (active === 0) {
    active = item.length - 1;
  } else {
    active--;
  }

  toggle();
});

const toggle = () => {
  setTimeout(() => {
    for (let i = 0; i < item.length; i++) {
      item[i].classList.remove("active");
    }

    item[active].classList.add("active");
    wrapper.style.transform = `rotateY(${currdeg}deg)`;
  }, 900);

  setTimeout(() => {
    slider.classList.toggle("zoom");
  }, 1900);
};
