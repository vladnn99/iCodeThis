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
  sliderElements[0].classList.add("-translate-x-full");
  sliderElements[1].classList.remove("translate-x-full");
  sliderElements.push(sliderElements[0]);
  sliderElements.shift();
  setTimeout(function () {
    sliderElements[2].className =
      "w-full h-full flex slider-element absolute translate-x-full transition-transform duration-1000 ease-in-out hidden";
  }, 1000);
  sliderElements[1].classList.remove("hidden");
}

setInterval(imageSlider, 7000);
