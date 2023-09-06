const nav = document.querySelector("nav");
const logo = document.querySelector("#logo");
const menu = document.querySelector("#menu");
const sliderImages = [
  {
    img: "files/img_1",
    alt: "NEGREANaccounting.com slider image 1 contabilitate",
    text: `Ana1 are mere
    Ana1 are si pere`,
  },
  {
    img: "files/img_2",
    alt: "NEGREANaccounting.com slider image 2 salarizare",
    text: `Ana2 are mere
    Ana2 are si pere`,
  },
  {
    img: "files/img_3",
    alt: "NEGREANaccounting.com slider image 3 contracte de muncă",
    text: `Ana3 are mere
    Ana3 are si pere`,
  },
];
let moveMenu = false;
let viewportWidth;

function initialize() {
  handleViewportChange();
  window.addEventListener("scroll", handleScroll);
}

initialize();

function handleScroll() {
  const scrollY = window.scrollY;
  if (scrollY > 0 && !moveMenu && viewportWidth >= 768) {
    moveMenu = true;
    logo.classList.remove("h-20");
    logo.classList.add("h-14");
    nav.classList.remove("h-32", "expanded");
    nav.classList.add("h-[5.5rem]", "shadow-lg");
  }
  if (scrollY === 0 && moveMenu && viewportWidth >= 768) {
    moveMenu = false;
    logo.classList.remove("h-14");
    logo.classList.add("h-20");
    nav.classList.remove("h-[5.5rem]");
    nav.classList.remove("shadow-lg");
    nav.classList.add("h-32", "expanded");
  }
}

function handleViewportChange() {
  viewportWidth = window.innerWidth;
  // console.log(`Viewport width changed to: ${viewportWidth}`);
}

window.addEventListener("resize", handleViewportChange);

const sliderElements = [...document.querySelectorAll(".slider-element")];
console.log(sliderElements);

function imageSlider() {
  setTimeout(function () {
    sliderElements[0].classList.add("-translate-x-full");
    sliderElements[0].classList.remove("-translate-x-full");
    sliderElements[0].classList.add("translate-x-full");
    console.log(sliderElements[0].className);
    sliderElements[1].classList.remove("translate-x-full");
  }, 3000);
  setTimeout(function () {
    sliderElements[0].classList.add("hidden");
    console.log(sliderElements[0].className);
    sliderElements[1].classList.add("-translate-x-full");
    sliderElements[2].classList.remove("translate-x-full");
  }, 6000);
  setTimeout(function () {
    sliderElements[0].classList.remove("hidden");
    sliderElements[2].classList.add("-translate-x-full");
    sliderElements[0].classList.remove("translate-x-full");
    console.log(sliderElements[0].className);
  }, 9000);
}

imageSlider();

// let currentIndex = 0;

// function showImage(index) {
//   sliderElements.forEach((element, i) => {
//     if (i === index) {
//       element.classList.remove("translate-x-full");
//     } else {
//       element.classList.add("translate-x-full");
//     }
//   });
// }

// function nextImage() {
//   currentIndex = (currentIndex + 1) % sliderElements.length;
//   showImage(currentIndex);
// }

// setInterval(nextImage, 3000);
