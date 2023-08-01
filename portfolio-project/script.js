console.log(`Hello world`);
const nav = document.querySelector("nav");
const avatar = document.getElementById("avatar");
const slider = document.getElementById("slider");
const menu = document.getElementById("menu");
const menuLinks = [...document.getElementsByClassName("links")];
console.log(avatar);
console.log(slider);
console.log(menu);

function addIds(menuLinks) {
  menuLinks.forEach((link, index) => {
    link.id = index;
  });
}

addIds(menuLinks);

menuLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    const clickedLinkId = +event.target.id;
    if (clickedLinkId === 1) {
      slider.classList.add("left-1/3");
      slider.classList.remove("left-0", "left-2/3");
      menuLinks[clickedLinkId].classList.add("text-white");
      menuLinks[clickedLinkId - 1].classList.remove("text-white");
      menuLinks[clickedLinkId + 1].classList.remove("text-white");
    }

    if (clickedLinkId === 2) {
      slider.classList.add("left-2/3");
      slider.classList.remove("left-0", "left-1/3");
      menuLinks[clickedLinkId].classList.add("text-white");
      menuLinks[clickedLinkId - 1].classList.remove("text-white");
      menuLinks[clickedLinkId - 2].classList.remove("text-white");
    }

    if (clickedLinkId === 0) {
      slider.classList.add("left-0");
      slider.classList.remove("left-1/3", "left-2/3");
      menuLinks[clickedLinkId].classList.add("text-white");
      menuLinks[clickedLinkId + 1].classList.remove("text-white");
      menuLinks[clickedLinkId + 2].classList.remove("text-white");
    }
  });
});

console.log(menuLinks);

// console.log(nav.childNodes[3].childNodes[1].childNodes[1].childNodes);
let moveMenu = false;

const handleScroll = () => {
  const scrollY = window.scrollY;
  if (scrollY > 10 && !moveMenu) {
    moveMenu = true;
    avatar.classList.remove("w-32", "h-32");
    avatar.classList.add("w-16", "h-16");
    nav.classList.remove("h-40");
    nav.classList.add("h-[5.5rem]", "shadow-lg");
  }
  if (scrollY < 10 && moveMenu) {
    moveMenu = false;
    // nav.classList.add("opacity-0");
    avatar.classList.remove("w-16", "h-16");
    avatar.classList.add("w-32", "h-32");
    nav.classList.remove("h-[5.5rem]");
    nav.classList.remove("shadow-lg");
    nav.classList.add("h-40");
  }
};

window.addEventListener("scroll", handleScroll);
