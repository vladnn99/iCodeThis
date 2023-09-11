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
const sliderElements = [...document.querySelectorAll(".slider-element")];
const sliderGotoServicesButtons = [
  ...document.querySelectorAll(".slider-gotoservices-button"),
];
const tabbedComponentsButtons = [
  ...document.querySelectorAll(".tabbed-component-button"),
];
const tabbedComponentsContentContainers = document.querySelectorAll(
  ".tabbed-component-container"
);
const hamburgerMenuContainer = document.querySelector(
  "#hamburgerMenuContainer"
);
const hamburgerButtonContainer = document.querySelector(
  "#hamburgerButtonContainer"
);
const hamburgerLinks = [...document.querySelectorAll(".hamburger-links")];
const body = document.querySelector("body");
let moveMenu = false;
let viewportWidth;

function initialize() {
  handleViewportChange();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleViewportChange);
  handleSliderButtonsClick();
  handleTabbedComponentsButtonsClick();
  setInterval(imageSlider, 7000);
}

initialize();

function handleScroll() {
  const scrollY = window.scrollY;
  if (scrollY > 0 && !moveMenu && viewportWidth >= 768) {
    moveMenu = true;
    logo.classList.remove("h-20");
    logo.classList.add("h-14");
    nav.classList.remove("md:h-32", "expanded");
    nav.classList.add("h-[5.5rem]", "shadow-lg");
  }
  if (scrollY === 0 && moveMenu && viewportWidth >= 768) {
    moveMenu = false;
    logo.classList.remove("h-14");
    logo.classList.add("h-20");
    nav.classList.remove("h-[5.5rem]");
    nav.classList.remove("shadow-lg");
    nav.classList.add("md:h-32", "expanded");
  }
}

function handleViewportChange() {
  viewportWidth = window.innerWidth;
  // console.log(`Viewport width changed to: ${viewportWidth}`);
}

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

function renderClickedService(indexButtons) {
  setTimeout(function () {
    tabbedComponentsContentContainers[indexButtons].classList.remove(
      "opacity-0",
      "hidden"
    );
  }, 350);
  tabbedComponentsContentContainers.forEach((container, indexContainers) => {
    if (indexButtons !== indexContainers) {
      container.classList.add("opacity-0");
      setTimeout(function () {
        container.classList.add("hidden");
      }, 350);
    }
  });
  tabbedComponentsButtons.forEach((button, index) => {
    if (indexButtons === index) {
      button.classList.add("border-b-[#ED1C24]", "text-[#ED1C24]");
    } else {
      button.classList.remove("border-b-[#ED1C24]", "text-[#ED1C24]");
    }
  });
}

function handleTabbedComponentsButtonsClick() {
  tabbedComponentsButtons.forEach((button, indexButtons) => {
    button.addEventListener("click", function () {
      renderClickedService(indexButtons);
    });
  });
}

function handleSliderButtonsClick() {
  sliderGotoServicesButtons.forEach((button, indexButtons) => {
    button.addEventListener("click", function () {
      renderClickedService(indexButtons);
      window.location.href = "#section2";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  function insertCopyright() {
    let copyright = "© " + new Date().getFullYear() + ", NEGREANaccounting.com";
    const copyrightContainer = document.createElement("p");
    copyrightContainer.className = "text-white text-sm self-end pb-4";
    copyrightContainer.textContent = copyright;
    const footer = document.querySelector("footer");
    footer.appendChild(copyrightContainer);
  }
  insertCopyright();
});

function transformHamburgerButton() {
  if (!line2.classList.contains("opacity-0")) {
    line2.classList.add("opacity-0");
    line1.classList.add("rotate-45", "translate-y-[0.67rem]", "bg-white");
    line3.classList.add("-rotate-45", "-translate-y-[0.67rem]", "bg-white");
    hamburgerMenuContainer.classList.remove("-z-10");
    hamburgerMenuContainer.classList.add("z-30");
    hamburgerMenu.classList.remove("translate-x-full");
    body.classList.add("no-scroll");
  } else {
    line2.classList.remove("opacity-0");
    line1.classList.remove("rotate-45", "translate-y-[0.67rem]", "bg-white");
    line3.classList.remove("-rotate-45", "-translate-y-[0.67rem]", "bg-white");
    hamburgerMenu.classList.add("translate-x-full");
    setTimeout(function () {
      hamburgerMenuContainer.classList.remove("z-30");
      hamburgerMenuContainer.classList.add("-z-10");
    }, 500);
    body.classList.remove("no-scroll");
  }
}

hamburgerButton.addEventListener("click", transformHamburgerButton);
hamburgerLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    transformHamburgerButton();
    setTimeout(function () {
      scrollToSection(index);
    }, 500);
  });
});

function scrollToSection(index) {
  let scrollPosition;
  if (index === 0) {
    scrollPosition = 0;
  }
  if (index === 1 || index === 2) {
    scrollPosition = document.querySelector(`#section${index + 1}`).offsetTop;
  }
  if (index === 3) {
    scrollPosition = document.querySelector("#footer").offsetTop;
  }
  window.scrollTo({
    top: scrollPosition,
    behavior: "smooth",
  });
}
