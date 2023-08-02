const nav = document.querySelector("nav");
const avatar = document.getElementById("avatar");
const slider = document.getElementById("slider");
const menu = document.getElementById("menu");
const menuLinks = [...document.getElementsByClassName("links")];
const targetSections = [];

console.log(avatar);
console.log(slider);
console.log(menu);
console.log(menuLinks);

function addIds(menuLinks) {
  menuLinks.forEach((link, index) => {
    link.id = index;
  });
}

function getTargetSections() {
  menuLinks.forEach((link) => {
    console.log(link);
    const targetId =
      link.getAttribute("href") !== "#" ? link.getAttribute("href") : "null";
    const targetSection = document.querySelector(targetId);
    targetSections.push({ targetSection: targetSection, targetOffset: "" });
  });
  targetSections.shift();
  targetSections[0].targetOffset =
    targetSections[0].targetSection.offsetTop - 76;
  targetSections[1].targetOffset =
    targetSections[1].targetSection.offsetTop + 296;

  console.log(targetSections);
}

getTargetSections();
addIds(menuLinks);

function scrollToSection(event, clickedLinkId) {
  event.preventDefault();
  window.scrollTo({
    top: targetSections[clickedLinkId - 1].targetOffset,
    behavior: "smooth",
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    const clickedLinkId = +event.target.id;
    if (clickedLinkId === 1) {
      slider.classList.add("left-1/3");
      slider.classList.remove("left-0", "left-2/3");
      menuLinks[clickedLinkId].classList.add("text-white");
      menuLinks[clickedLinkId - 1].classList.remove("text-white");
      menuLinks[clickedLinkId + 1].classList.remove("text-white");
      scrollToSection(event, clickedLinkId);
    }

    if (clickedLinkId === 2) {
      slider.classList.add("left-2/3");
      slider.classList.remove("left-0", "left-1/3");
      menuLinks[clickedLinkId].classList.add("text-white");
      menuLinks[clickedLinkId - 1].classList.remove("text-white");
      menuLinks[clickedLinkId - 2].classList.remove("text-white");
      scrollToSection(event, clickedLinkId);
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

function handleScroll() {
  const scrollY = window.scrollY;
  if (scrollY > 0 && !moveMenu) {
    moveMenu = true;
    avatar.classList.remove("w-32", "h-32");
    avatar.classList.add("w-16", "h-16");
    nav.classList.remove("h-40");
    nav.classList.add("h-[5.5rem]", "shadow-lg");
  }
  if (scrollY === 0 && moveMenu) {
    moveMenu = false;
    // nav.classList.add("opacity-0");
    avatar.classList.remove("w-16", "h-16");
    avatar.classList.add("w-32", "h-32");
    nav.classList.remove("h-[5.5rem]");
    nav.classList.remove("shadow-lg");
    nav.classList.add("h-40");
  }
  const currentSection = getCurrentSection();
  console.log(`The scrollbar is in section with ID: ${currentSection}`);
}

window.addEventListener("scroll", handleScroll);

function getCurrentSection() {
  const sections = targetSections.map((section) => {
    const rect = section.targetSection.getBoundingClientRect();
    return {
      id: section.targetSection.id,
      distance: rect.top,
    };
  });

  // Filter out sections with negative distance (i.e., above the viewport)
  const visibleSections = sections.filter((section) => section.distance >= 0);

  // Sort the visibleSections array by distance (closest to top of viewport)
  visibleSections.sort((a, b) => a.distance - b.distance);

  // Return the first section in the sorted array (closest to top of viewport)
  return visibleSections[0].id;
}
