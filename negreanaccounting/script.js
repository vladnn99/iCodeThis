// import languageRo from "./ro.json" assert { type: "json" };
// import languageEn from "./en.json" assert { type: "json" };
// console.log(languageRo);
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

async function loadLanguageFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(
        `Failed to load language file: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error loading language file: ${error}`);
    throw error; // Re-throw the error to handle it further if needed
  }
}

async function loadLanguageFiles() {
  try {
    const [languageRo, languageEn] = await Promise.all([
      loadLanguageFile("./ro.json"),
      loadLanguageFile("./en.json"),
    ]);

    // Both language files are loaded successfully
    console.log(languageRo);
    console.log(languageEn);

    languageEventListener();
    console.log(tabbedComponentsButtons);

    function languageEventListener() {
      const languageButtons = [...document.querySelectorAll(".set-language")];
      languageButtons.forEach((button) => {
        button.classList.add(
          "transition-all",
          "duration-300",
          "hover:text-red-400",
          "hover:ease-in-out"
        );
        button.addEventListener("click", function () {
          const language = button.textContent;
          if (language.toLowerCase() === "ro") {
            setContent(languageRo);
            button.classList.remove("font-light");
            button.classList.add("font-bold", "scale-125");
            languageButtons[1].classList.remove("font-bold", "scale-125");
            languageButtons[1].classList.add("font-light");
          }
          if (language.toLowerCase() === "en") {
            setContent(languageEn);
            button.classList.remove("font-light");
            button.classList.add("font-bold", "scale-125");
            languageButtons[0].classList.remove("font-bold", "scale-125");
            languageButtons[0].classList.add("font-light");
          }
        });
      });
    }

    function setContent(language) {
      const { menuButtons } = language.data;
      const menuItems = [...document.querySelectorAll(".menu-text")];
      const img1Description = document.querySelector("#img1Description");
      const h1Img1Description = document.createElement("h1");
      const img1DescriptionButton = document.createElement("button");
      const img1DescriptionList = document.createElement("ul");
      const img2Description = document.querySelector("#img2Description");
      const h1Img2Description = document.createElement("h1");
      const img2DescriptionButton = document.createElement("button");
      const img2DescriptionList = document.createElement("ul");
      const img3Description = document.querySelector("#img3Description");
      const h1Img3Description = document.createElement("h1");
      const img3DescriptionButton = document.createElement("button");
      const img3DescriptionList = document.createElement("ul");
      const tabbedComponentButtonsText = [
        ...document.querySelectorAll(".tabbed-text"),
      ];
      const section2Header = document.querySelector("#section2Header");
      const rightTextContabilitate = document.querySelector(
        "#rightTextContabilitate"
      );
      const rightTextContabilitateUl = document.createElement("ul");
      const rightTextContabilitateUlH2 = document.createElement("h2");
      const rightTextContabilitateUl2 = document.createElement("ul");
      const rightTextContabilitateUl2H2 = document.createElement("h2");
      const rightTextContabilitateUl2H3_1 = document.createElement("h3");
      const rightTextContabilitateUl2H3_2 = document.createElement("h3");
      const rightTextContabilitateUl2LastLi = document.createElement("li");
      const rightTextSalarizare = document.querySelector(
        "#rightTextSalarizare"
      );
      const rightTextSalarizareUl = document.createElement("ul");
      const rightTextContracte = document.querySelector("#rightTextContracte");
      const rightTextContracteUl = document.createElement("ul");
      const rightTextDespre = document.querySelector("#aboutRight");
      const paragraph1 = document.createElement("p");
      const paragraph2 = document.createElement("p");
      const paragraph3 = document.createElement("p");
      const paragraph4 = document.createElement("p");
      const paragraph5 = document.createElement("p");
      const h1Contact = document.querySelector("#contact");
      const contactAdresa = document.querySelector("#contactAdresa");
      const hamburgerMenuLanguage = document.querySelector("#hamburgerMenu");

      hamburgerMenu.innerHTML = "";
      language.data.menuButtons.forEach((element) => {
        const button = document.createElement("button");
        button.className = "text-white text-4xl hamburger-links";
        button.textContent = element;
        hamburgerMenuLanguage.appendChild(button);
      });
      const hamburgerLinksLanguage = [
        ...document.querySelectorAll(".hamburger-links"),
      ];
      allocateHamburgerLinks(hamburgerLinksLanguage);
      console.log(hamburgerLinksLanguage);

      language.data.section1.sliderHeadlineContabilitate.listElements.forEach(
        (element) => {
          const listElement = document.createElement("li");
          listElement.className = "py-2 text-center";
          listElement.textContent = element;
          img1DescriptionList.appendChild(listElement);
        }
      );
      language.data.section1.sliderHeadlineSalarizare.listElements.forEach(
        (element) => {
          const listElement = document.createElement("li");
          listElement.className = "py-2 text-center";
          listElement.textContent = element;
          img2DescriptionList.appendChild(listElement);
        }
      );
      language.data.section1.sliderHeadlineContracte.listElements.forEach(
        (element) => {
          const listElement = document.createElement("li");
          listElement.className = "py-2 text-center";
          listElement.textContent = element;
          img3DescriptionList.appendChild(listElement);
        }
      );
      h1Img1Description.className = "text-4xl mb-6 max-w-xl text-center";
      h1Img2Description.className = "text-4xl mb-6 max-w-xl text-center";
      h1Img3Description.className = "text-4xl mb-6 max-w-xl text-center";
      img1DescriptionButton.className =
        "bg-[#ED1C24] text-white py-2 mt-2 px-3 text-sm font-light rounded-md md:hover:transition-all md:hover:bg-red-500 duration-300 ease-in-out slider-gotoservices-button";
      img2DescriptionButton.className =
        "bg-[#ED1C24] text-white py-2 mt-2 px-3 text-sm font-light rounded-md md:hover:transition-all md:hover:bg-red-500 duration-300 ease-in-out slider-gotoservices-button";
      img3DescriptionButton.className =
        "bg-[#ED1C24] text-white py-2 mt-2 px-3 text-sm font-light rounded-md md:hover:transition-all md:hover:bg-red-500 duration-300 ease-in-out slider-gotoservices-button";
      img1DescriptionButton.textContent = "";
      img2DescriptionButton.textContent = "";
      img3DescriptionButton.textContent = "";
      img1DescriptionButton.textContent = language.data.detailsButton;
      img2DescriptionButton.textContent = language.data.detailsButton;
      img3DescriptionButton.textContent = language.data.detailsButton;
      h1Img1Description.textContent = "";
      h1Img2Description.textContent = "";
      h1Img3Description.textContent = "";
      h1Img1Description.textContent =
        language.data.section1.sliderHeadlineContabilitate.name;
      h1Img2Description.textContent =
        language.data.section1.sliderHeadlineSalarizare.name;
      h1Img3Description.textContent =
        language.data.section1.sliderHeadlineContracte.name;
      img1Description.innerHTML = "";
      img2Description.innerHTML = "";
      img3Description.innerHTML = "";
      img1Description.appendChild(h1Img1Description);
      img1Description.appendChild(img1DescriptionList);
      img1Description.appendChild(img1DescriptionButton);
      img2Description.appendChild(h1Img2Description);
      img2Description.appendChild(img2DescriptionList);
      img2Description.appendChild(img2DescriptionButton);
      img3Description.appendChild(h1Img3Description);
      img3Description.appendChild(img3DescriptionList);
      img3Description.appendChild(img3DescriptionButton);
      menuItems.forEach((item, index) => {
        item.textContent = menuButtons[index];

        const sliderGotoServicesButtonsLanguage = [
          ...document.querySelectorAll(".slider-gotoservices-button"),
        ];

        handleSliderButtonsClick(sliderGotoServicesButtonsLanguage);
        tabbedComponentButtonsText.forEach(
          (text, index) =>
            (text.textContent =
              language.data.section2.tabbedComponentHeaders[index].header)
        );
      });

      section2Header.textContent = language.data.section2.header;

      rightTextContabilitate.innerHTML = "";
      rightTextContabilitate.className =
        "w-full lg:w-2/3 custom-columns p-4 gap-3 h-fit lg:h-full";
      rightTextContabilitateUl.className =
        "list-inside gap-2 text-sm column-item w-full column-item";
      rightTextContabilitateUlH2.className = "text-xl font-normal";
      rightTextContabilitateUlH2.innerText =
        language.data.section2.tabbedComponentHeaders[0].h2_1;
      rightTextContabilitate.appendChild(rightTextContabilitateUl);
      rightTextContabilitateUl.appendChild(rightTextContabilitateUlH2);
      language.data.section2.tabbedComponentHeaders[0].contentObject.column1.forEach(
        (listElement) => {
          const li = document.createElement("li");
          li.textContent = listElement;
          rightTextContabilitateUl.appendChild(li);
        }
      );

      rightTextContabilitateUl2.className =
        "list-inside gap-2 text-sm column-item w-full mt-4 md:mt-0 column-item";
      rightTextContabilitateUl2H2.className = "text-xl font-normal";
      rightTextContabilitateUl2H2.innerText =
        language.data.section2.tabbedComponentHeaders[0].h2_2;
      rightTextContabilitateUl2.appendChild(rightTextContabilitateUl2H2);
      rightTextContabilitate.appendChild(rightTextContabilitateUl2);

      rightTextContabilitateUl2H3_1.textContent =
        language.data.section2.tabbedComponentHeaders[0].contentObject.column2.header3_1;
      rightTextContabilitateUl2H3_1.className = "underline";
      rightTextContabilitateUl2.appendChild(rightTextContabilitateUl2H3_1);
      language.data.section2.tabbedComponentHeaders[0].contentObject.column2.content1.forEach(
        (listElement) => {
          const li = document.createElement("li");
          li.textContent = listElement;
          rightTextContabilitateUl2.appendChild(li);
        }
      );
      rightTextContabilitateUl2H3_2.className = "underline";
      rightTextContabilitateUl2H3_2.textContent =
        language.data.section2.tabbedComponentHeaders[0].contentObject.column2.header3_2;
      rightTextContabilitateUl2.appendChild(rightTextContabilitateUl2H3_2);
      rightTextContabilitateUl2LastLi.textContent =
        language.data.section2.tabbedComponentHeaders[0].contentObject.column2.content2;
      rightTextContabilitateUl2.appendChild(rightTextContabilitateUl2LastLi);

      rightTextSalarizare.innerHTML = "";
      rightTextSalarizare.className = "w-full lg:w-2/3 flex p-4 gap-3";
      language.data.section2.tabbedComponentHeaders[1].contentObject.column1.forEach(
        (listElement) => {
          const li = document.createElement("li");
          li.textContent = listElement;
          rightTextSalarizareUl.appendChild(li);
        }
      );
      rightTextSalarizareUl.className =
        "list-inside flex flex-col gap-2 text-sm column-item w-full lg:w-1/2";
      rightTextSalarizare.appendChild(rightTextSalarizareUl);

      rightTextContracte.innerHTML = "";
      rightTextContracte.className = "w-full lg:w-2/3 flex p-4 gap-3";
      rightTextContracteUl.className =
        "list-inside flex flex-col gap-2 text-sm column-item w-full lg:w-1/2";
      language.data.section2.tabbedComponentHeaders[2].contentObject.column1.forEach(
        (listElement) => {
          const li = document.createElement("li");
          li.textContent = listElement;
          rightTextContracteUl.appendChild(li);
        }
      );
      rightTextContracte.appendChild(rightTextContracteUl);

      rightTextDespre.innerHTML = "";
      paragraph1.textContent = language.data.section3.paragraph1_1;
      const highlightSpan = document.createElement("span");
      highlightSpan.className = "font-semibold text-[#ED1C24]";
      highlightSpan.textContent = language.data.section3.paragraph1_2_span;
      paragraph1.appendChild(highlightSpan);
      const paragraph1_3 = document.createElement("span");
      paragraph1_3.textContent = language.data.section3.paragraph1_3;
      paragraph1.appendChild(paragraph1_3);
      paragraph1.className =
        paragraph2.className =
        paragraph3.className =
        paragraph4.className =
        paragraph5.className =
          "mb-3";
      rightTextDespre.appendChild(paragraph1);
      paragraph2.textContent = language.data.section3.paragraph2;
      rightTextDespre.appendChild(paragraph2);
      paragraph3.textContent = language.data.section3.paragraph3;
      rightTextDespre.appendChild(paragraph3);
      paragraph4.textContent = language.data.section3.paragraph4;
      rightTextDespre.appendChild(paragraph4);
      paragraph5.textContent = language.data.section3.paragraph5;
      rightTextDespre.appendChild(paragraph5);

      const h1DespreNoi = document.querySelector("#despreNoiHeader");
      h1DespreNoi.textContent = language.data.section3.header;
      h1Contact.textContent = language.data.footer.h1;
      contactAdresa.textContent = language.data.footer.address;

      const numeleTau = document.querySelector("#name");
      const emailulTau = document.querySelector("#email");
      const mesajulTau = document.querySelector("#message");
      numeleTau.placeholder = language.data.footer.namePlaceholder;
      emailulTau.placeholder = language.data.footer.emailPlaceholder;
      mesajulTau.placeholder = language.data.footer.messagePlaceholder;
    }
  } catch (error) {
    // Handle errors if any language file fails to load
    console.error(`Error loading language files: ${error}`);
  }
}

function initialize() {
  loadLanguageFiles();
  handleViewportChange();
  allocateHamburgerLinks(hamburgerLinks);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleViewportChange);
  handleSliderButtonsClick(sliderGotoServicesButtons);
  handleTabbedComponentsButtonsClick();
  setInterval(imageSlider, 7000);
}

initialize();

function handleScroll() {
  const scrollY = window.scrollY;
  if (scrollY > 0 && !moveMenu && viewportWidth >= 768) {
    moveMenu = true;
    logo.classList.remove("lg:h-20");
    logo.classList.add("h-14");
    nav.classList.remove("md:h-32", "expanded");
    nav.classList.add("h-[5.5rem]", "shadow-lg");
  }
  if (scrollY === 0 && moveMenu && viewportWidth >= 768) {
    moveMenu = false;
    logo.classList.remove("h-14");
    logo.classList.add("lg:h-20");
    nav.classList.remove("h-[5.5rem]");
    nav.classList.remove("shadow-lg");
    nav.classList.add("md:h-32", "expanded");
  }
  const translateY = scrollY;
  const contentHeight = document.body.scrollHeight - window.innerHeight;
  if (translateY < contentHeight) {
    hamburgerMenuContainer.style.transform = `translateY(${translateY}px)`;
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

function handleSliderButtonsClick(buttons) {
  buttons.forEach((button, indexButtons) => {
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
    copyrightContainer.className = "text-white text-sm self-end pb-4 pr-1";
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
    document.body.style.overflow = "hidden";
  } else {
    line2.classList.remove("opacity-0");
    line1.classList.remove("rotate-45", "translate-y-[0.67rem]", "bg-white");
    line3.classList.remove("-rotate-45", "-translate-y-[0.67rem]", "bg-white");
    hamburgerMenu.classList.add("translate-x-full");
    setTimeout(function () {
      hamburgerMenuContainer.classList.remove("z-30");
      hamburgerMenuContainer.classList.add("-z-10");
    }, 500);
    document.body.style.overflow = "auto";
  }
}

hamburgerButton.addEventListener("click", transformHamburgerButton);
function allocateHamburgerLinks(links) {
  links.forEach((link, index) => {
    link.addEventListener("click", function () {
      transformHamburgerButton();
      setTimeout(function () {
        scrollToSection(index);
      }, 500);
    });
  });
}

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
