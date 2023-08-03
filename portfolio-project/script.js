const nav = document.querySelector("nav");
const avatar = document.getElementById("avatar");
const slider = document.getElementById("slider");
const menu = document.getElementById("menu");
const menuLinks = [...document.getElementsByClassName("links")];
const targetSections = [];
const filterButtons = [...document.getElementsByClassName("filter-buttons")];
const projects = [
  {
    coverImage:
      "https://github.com/vladnn99/iCodeThis/blob/main/portfolio-project/files/image33.png?raw=true",
    Name: "UIDeli.com",
    Type: "Design + Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aliquid quas itaque, adipisci neque nihil tempore, nulla dolorem ad fugit officiis saepe reiciendis non nesciunt, dolor eligendi a sapiente dignissimos impedit doloremque optio nostrum omnis rem nam! Iure molestias animi excepturi temporibus alias incidunt distinctio provident praesentium dolorum dolore. Cumque.",
  },
  {
    coverImage:
      "https://github.com/vladnn99/iCodeThis/blob/main/portfolio-project/files/koto-studio.png?raw=true",
    Name: "Koto Studio",
    Type: "Design + Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aliquid quas itaque, adipisci neque nihil tempore, nulla dolorem ad fugit officiis saepe reiciendis non nesciunt, dolor eligendi a sapiente dignissimos impedit doloremque optio nostrum omnis rem nam! Iure molestias animi excepturi temporibus alias incidunt distinctio provident praesentium dolorum dolore. Cumque.",
  },
  {
    coverImage:
      "https://raw.githubusercontent.com/vladnn99/iCodeThis/d71ebea43880af266744a4361a5f0e5732527796/portfolio-project/files/switch-black.png",
    Name: "Switch Black",
    Type: "Design",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aliquid quas itaque, adipisci neque nihil tempore, nulla dolorem ad fugit officiis saepe reiciendis non nesciunt, dolor eligendi a sapiente dignissimos impedit doloremque optio nostrum omnis rem nam! Iure molestias animi excepturi temporibus alias incidunt distinctio provident praesentium dolorum dolore. Cumque.",
  },
  {
    coverImage:
      "https://raw.githubusercontent.com/vladnn99/iCodeThis/38012c94698ab35e5fba7d887a825c745a046be5/portfolio-project/files/image-34.png",
    Name: "Remarket",
    Type: "Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aliquid quas itaque, adipisci neque nihil tempore, nulla dolorem ad fugit officiis saepe reiciendis non nesciunt, dolor eligendi a sapiente dignissimos impedit doloremque optio nostrum omnis rem nam! Iure molestias animi excepturi temporibus alias incidunt distinctio provident praesentium dolorum dolore. Cumque.",
  },
  {
    coverImage:
      "https://raw.githubusercontent.com/vladnn99/iCodeThis/38012c94698ab35e5fba7d887a825c745a046be5/portfolio-project/files/image-34.png",
    Name: "Another One",
    Type: "Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aliquid quas itaque, adipisci neque nihil tempore, nulla dolorem ad fugit officiis saepe reiciendis non nesciunt, dolor eligendi a sapiente dignissimos impedit doloremque optio nostrum omnis rem nam! Iure molestias animi excepturi temporibus alias incidunt distinctio provident praesentium dolorum dolore. Cumque.",
  },
  {
    coverImage:
      "https://raw.githubusercontent.com/vladnn99/iCodeThis/4e279cfeef60d73a5322c98ee8281c20b663b081/portfolio-project/files/blender-renders.png",
    Name: "Blender Renders",
    Type: "Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia aliquid quas itaque, adipisci neque nihil tempore, nulla dolorem ad fugit officiis saepe reiciendis non nesciunt, dolor eligendi a sapiente dignissimos impedit doloremque optio nostrum omnis rem nam! Iure molestias animi excepturi temporibus alias incidunt distinctio provident praesentium dolorum dolore. Cumque.",
  },
];

console.log(avatar);
console.log(slider);
console.log(menu);
console.log(menuLinks);
console.log(filterButtons);
console.log(projects);

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
  const navTargetId = document.getElementById("navTop");
  console.log(navTargetId);
  targetSections[0].targetOffset = 0;
  targetSections[0].targetSection = navTargetId;
  // targetSections.shift();
  targetSections[1].targetOffset =
    targetSections[1].targetSection.offsetTop - 88;
  targetSections[2].targetOffset = targetSections[2].targetSection.offsetTop;
  console.log(targetSections);
}

getTargetSections();
addIds(menuLinks);

function scrollToSection(event, clickedLinkId) {
  event.preventDefault();
  window.scrollTo({
    top: targetSections[clickedLinkId].targetOffset,
    behavior: "smooth",
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    const clickedLinkId = +event.target.id;
    console.log(clickedLinkId);
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
      scrollToSection(event, clickedLinkId);
    }
  });
});

console.log(menuLinks);

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
    avatar.classList.remove("w-16", "h-16");
    avatar.classList.add("w-32", "h-32");
    nav.classList.remove("h-[5.5rem]");
    nav.classList.remove("shadow-lg");
    nav.classList.add("h-40");
  }
}

window.addEventListener("scroll", handleScroll);

filterButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    if (index === 0) {
      button.classList.add("bg-[#1F1E26]", "text-white");
      filterButtons[1].classList.remove("text-white", "bg-[#1F1E26]");
      filterButtons[2].classList.remove("text-white", "bg-[#1F1E26]");
    }
    if (index === 1) {
      button.classList.add("bg-[#1F1E26]", "text-white");
      filterButtons[0].classList.remove("text-white", "bg-[#1F1E26]");
      filterButtons[2].classList.remove("text-white", "bg-[#1F1E26]");
    }
    if (index === 2) {
      button.classList.add("bg-[#1F1E26]", "text-white");
      filterButtons[0].classList.remove("text-white", "bg-[#1F1E26]");
      filterButtons[1].classList.remove("text-white", "bg-[#1F1E26]");
    }
  });
});

// Incearca 2 coloane cu grid si inauntru flex pt afisare portfolio in foma din figma
