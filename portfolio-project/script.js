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
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus ad exercitationem inventore, ipsam neque quidem animi sapiente magni necessitatibus.",
  },
  {
    coverImage:
      "https://github.com/vladnn99/iCodeThis/blob/main/portfolio-project/files/koto-studio.png?raw=true",
    Name: "Koto Studio",
    Type: "Design + Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus ad exercitationem inventore, ipsam neque quidem animi sapiente magni necessitatibus.",
  },
  {
    coverImage:
      "https://raw.githubusercontent.com/vladnn99/iCodeThis/d71ebea43880af266744a4361a5f0e5732527796/portfolio-project/files/switch-black.png",
    Name: "Switch Black",
    Type: "Design",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus ad exercitationem inventore, ipsam neque quidem animi sapiente magni necessitatibus.",
  },
  {
    coverImage:
      "https://raw.githubusercontent.com/vladnn99/iCodeThis/38012c94698ab35e5fba7d887a825c745a046be5/portfolio-project/files/image-34.png",
    Name: "Remarket",
    Type: "Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus ad exercitationem inventore, ipsam neque quidem animi sapiente magni necessitatibus.",
  },
  {
    coverImage:
      "https://github.com/vladnn99/iCodeThis/blob/main/portfolio-project/files/another-one.png?raw=true",
    Name: "Another One",
    Type: "Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus ad exercitationem inventore, ipsam neque quidem animi sapiente magni necessitatibus.",
  },
  {
    coverImage:
      "https://raw.githubusercontent.com/vladnn99/iCodeThis/4e279cfeef60d73a5322c98ee8281c20b663b081/portfolio-project/files/blender-renders.png",
    Name: "Blender Renders",
    Type: "Development",
    Year: 2023,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus ad exercitationem inventore, ipsam neque quidem animi sapiente magni necessitatibus.",
  },
];
const projectsContainer = document.getElementById("projectsContainer");
const projectTypes = ["Design + Development", "Design", "Development"];
const viewTypeButtons = [
  ...document.getElementsByClassName("change-view-button"),
];
let clickedIndex = 0;
let moveMenu = false;

function initialize() {
  assignProjectId();
  renderProjectsGrid(clickedIndex);
  getTargetSections();
  addIds(menuLinks);
  slidingFocusMenu();
  window.addEventListener("scroll", handleScroll);
  setFilterButtons();
  setViewButtons();
  viewTypeButtons[0].classList.add("button-pressed");
}

initialize();

function assignProjectId() {
  projects.forEach((project, index) => (project.id = index));
}

function filterProjects(projects, clickedIndex) {
  const fProjects = projects.filter((project) => {
    if (clickedIndex === 0) {
      return (
        project.Type === projectTypes[0] ||
        project.Type === projectTypes[1] ||
        project.Type === projectTypes[2]
      );
    }
    if (clickedIndex === 1 || clickedIndex === 2) {
      return project.Type === projectTypes[clickedIndex];
    }
  });
  return fProjects;
}

function renderProjectGrid(project) {
  const projectDiv = document.createElement("div");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  img.className =
    "object-contain w-full hover:opacity-70 transition-opacity duration-300";
  img.src = `${project.coverImage}`;
  h2.innerText = `${project.Name}`;
  p.className = "text-xs font-semibold";
  p.innerHTML = `${project.Type} <span class="ml-2">2023</span>`;
  projectDiv.className =
    "flex flex-col gap-2 mb-8 column-item cursor-pointer project";
  projectDiv.appendChild(img);
  projectDiv.appendChild(h2);
  projectDiv.appendChild(p);
  projectsContainer.appendChild(projectDiv);
}

// Generate project view
function renderProjectsGrid(clickedIndex) {
  projectsContainer.classList.remove("opacity-0");
  projectsContainer.innerHTML = "";
  const filteredProjects = filterProjects(projects, clickedIndex);
  filteredProjects.forEach((project) => {
    renderProjectGrid(project);
  });
  visibleProjectsAddEventListener(filteredProjects);
}

function addIds(menuLinks) {
  menuLinks.forEach((link, index) => {
    link.id = index;
  });
}

function getTargetSections() {
  menuLinks.forEach((link) => {
    const targetId =
      link.getAttribute("href") !== "#" ? link.getAttribute("href") : "null";
    const targetSection = document.querySelector(targetId);
    targetSections.push({ targetSection: targetSection, targetOffset: "" });
  });
  const navTargetId = document.getElementById("navTop");
  targetSections[0].targetOffset = 0;
  targetSections[0].targetSection = navTargetId;
  targetSections[1].targetOffset =
    targetSections[1].targetSection.offsetTop - 88;
  targetSections[2].targetOffset = targetSections[2].targetSection.offsetTop;
  console.log(targetSections);
}

function scrollToSection(event, clickedLinkId) {
  event.preventDefault();
  window.scrollTo({
    top: targetSections[clickedLinkId].targetOffset,
    behavior: "smooth",
  });
}

// Sliding focus on the menu
function slidingFocusMenu() {
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
}

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

function setFilterButtons() {
  filterButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      filterButtons.forEach((btn, idx) => {
        if (idx === index) {
          btn.classList.add("bg-[#1F1E26]", "text-white");
        } else {
          btn.classList.remove("bg-[#1F1E26]", "text-white");
        }
      });
      clickedIndex = index;
      projectsContainer.classList.add("opacity-0");
      setTimeout(function () {
        if (viewTypeButtons[0].classList.contains("button-pressed")) {
          renderProjectsGrid(clickedIndex);
        }
        if (viewTypeButtons[1].classList.contains("button-pressed")) {
          renderProjectsList(clickedIndex);
        }
      }, 300);
    });
  });
}

function setViewButtons() {
  viewTypeButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      viewTypeButtons.forEach((btn, idx) => {
        if (idx === index) {
          btn.classList.add("bg-[#1F1E26]", "text-white", "button-pressed");
        } else {
          btn.classList.remove("bg-[#1F1E26]", "text-white", "button-pressed");
        }
      });
      if (viewTypeButtons[0].className.includes("button-pressed")) {
        projectsContainer.classList.add("opacity-0");
        setTimeout(function () {
          projectsContainer.classList.add("custom-columns");
          renderProjectsGrid(clickedIndex);
        }, 300);
      }
      if (viewTypeButtons[1].className.includes("button-pressed")) {
        projectsContainer.classList.add("opacity-0");
        setTimeout(function () {
          projectsContainer.classList.remove("custom-columns");
          renderProjectsList(clickedIndex);
        }, 300);
      }
    });
  });
}

function renderProjectList(project) {
  const projectDiv = document.createElement("div");
  const img = document.createElement("img");
  const imgContainer = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const description = document.createElement("p");
  const rightContainer = document.createElement("div");
  imgContainer.className = "w-2/5 h-full flex";
  img.className =
    "object-cover w-full h-full hover:opacity-70 transition-opacity duration-300";
  img.src = `${project.coverImage}`;
  img.style = "object-position: center top;";
  h2.innerText = `${project.Name}`;
  rightContainer.className = "w-3/5 flex flex-col gap-3 justify-center";
  rightContainer.id = "rightContainer";
  p.className = "text-xs font-semibold";
  p.innerHTML = `${project.Type} <span class="ml-2">2023</span>`;
  description.innerText = project.Description;
  description.className = "text-xs";
  projectDiv.className = "flex gap-14 mb-8 h-56 z-10 cursor-pointer project";
  rightContainer.appendChild(h2);
  rightContainer.appendChild(p);
  rightContainer.appendChild(description);
  imgContainer.appendChild(img);
  projectDiv.appendChild(imgContainer);
  projectDiv.appendChild(rightContainer);
  projectsContainer.appendChild(projectDiv);
}

function renderProjectsList(clickedIndex) {
  projectsContainer.classList.remove("opacity-0");
  projectsContainer.innerHTML = "";
  const filteredProjects = filterProjects(projects, clickedIndex);
  filteredProjects.forEach((project) => {
    renderProjectList(project);
  });
  visibleProjectsAddEventListener(filteredProjects);
}

function generateProjectModalWindow(clickedForModalIndex) {
  const filteredProjects = filterProjects(projects, clickedIndex);
  console.log(filteredProjects);
  const modalWindow = document.getElementById("modalWindow");
  const modalContainer = document.createElement("div");
  const modalHeader = document.createElement("div");
  const closeModalBtn = document.createElement("button");
  const svg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-x w-3 h-3 transition duration-300 group-hover:rotate-90 ease-in"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M18 6l-12 12"></path>
  <path d="M6 6l12 12"></path>
</svg>`;
  const modalContent = document.createElement("div");
  const contentUp = document.createElement("div");
  const h1AndPContainer = document.createElement("div");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const contentDown = document.createElement("div");
  const leftDown = document.createElement("div");
  const a = document.createElement("a");
  const svgLink = `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-arrow-up-right w-3 h-3 transition duration-300 group-hover:rotate-45"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M17 7l-10 10"></path>
  <path d="M8 7l9 0l0 9"></path>
</svg>`;
  const span = document.createElement("span");
  const rightDown = document.createElement("div");
  const h2_1 = document.createElement("h2");
  const pD_1 = document.createElement("p");
  const h2_2 = document.createElement("h2");
  const pD_2 = document.createElement("p");
  const tags = document.createElement("div");
  const tag1 = document.createElement("button");
  const tag2 = document.createElement("button");

  modalWindow.classList.remove("hidden", "opacity-0");
  modalWindow.classList.add("flex");
  modalContainer.id = "modalContainer";
  modalContainer.className =
    "w-full md:w-3/4 h-full bg-white md:max-w-3xl flex flex-col";
  modalHeader.id = "modalHeader";
  modalHeader.className =
    "w-full h-[8%] bg-[#1F1E26] flex items-center shadow-lg";
  closeModalBtn.id = "closeModal";
  closeModalBtn.className =
    "text-white ml-auto mr-12 w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full group";
  modalContent.id = "modalContent";
  modalContent.className = "w-full h-[92%] flex flex-col p-20 pt-12 gap-4";
  contentUp.id = "contentUp";
  contentUp.className = "w-full h-[55%] flex flex-col";
  h1AndPContainer.id = "h1AndPContainer";
  h1AndPContainer.className = "w-full flex flex-col h-1/6 gap-3";
  h1.className = "font-medium text-lg";
  h1.innerText = `Helping ${filteredProjects[clickedForModalIndex].Name} give their users the best online experience`;
  p.className = "text-xs font-medium";
  p.innerText = filteredProjects[clickedForModalIndex].Name;
  imgContainer.className = "w-full flex h-5/6 mt-auto";
  img.src = filteredProjects[clickedForModalIndex].coverImage;
  img.className = "w-full object-cover";
  img.style = "object-position: center top";
  contentDown.id = "contentDown";
  contentDown.className = "w-full h-[45%] flex gap-16";
  leftDown.id = "leftDown";
  leftDown.className = "w-1/5 h-full flex flex-col";
  a.href = "#";
  a.className = "text-xs underline flex items-center gap-2 group font-medium";
  a.innerText = "Visit website";
  span.className =
    "flex items-center w-5 h-5 justify-center bg-[#483ED0] text-white rounded-full transition duration-300 group-hover:bg-[#7166FF]";
  span.innerHTML += svgLink;
  rightDown.id = "rightDown";
  rightDown.className = "w-4/5 h-full flex flex-col gap-3";
  h2_1.className = "font-medium";
  h2_1.innerText = `About ${filteredProjects[clickedForModalIndex].Name}`;
  pD_1.className = "text-xs";
  pD_1.innerText = `${filteredProjects[clickedForModalIndex].Description}`;
  h2_2.className = "font-medium mt-4";
  h2_2.innerText = "The Project";
  pD_2.className = "text-xs";
  pD_2.innerText = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
  atque temporibus eius deleniti nam praesentium.`;
  tags.className = "flex gap-2 items-center text-xs mt-4";
  tag1.className = tag2.className = "px-5 h-10 rounded-full border";
  tag1.innerText = "Design";
  tag2.innerText = "Development";

  closeModalBtn.innerHTML += svg;
  modalHeader.appendChild(closeModalBtn);
  h1AndPContainer.appendChild(p);
  h1AndPContainer.appendChild(h1);
  contentUp.appendChild(h1AndPContainer);
  contentUp.appendChild(imgContainer);
  imgContainer.appendChild(img);
  modalContent.appendChild(contentUp);
  a.appendChild(span);
  leftDown.appendChild(a);
  contentDown.appendChild(leftDown);
  rightDown.appendChild(h2_1);
  rightDown.appendChild(pD_1);
  rightDown.appendChild(h2_2);
  rightDown.appendChild(pD_2);
  tags.appendChild(tag1);
  tags.appendChild(tag2);
  rightDown.appendChild(tags);

  contentDown.appendChild(rightDown);
  modalContent.appendChild(contentDown);
  modalContainer.appendChild(modalHeader);
  modalContainer.appendChild(modalContent);
  modalWindow.appendChild(modalContainer);

  // Close modal
  closeModalBtn.addEventListener("click", function () {
    modalWindow.classList.add("opacity-0");
    setTimeout(function () {
      modalWindow.classList.add("hidden");
      modalWindow.innerHTML = "";
    }, 300);
  });

  // Prevent the click event from reaching the modalWindow
  modalContainer.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  modalWindow.addEventListener("click", function () {
    modalWindow.classList.add("opacity-0");
    setTimeout(function () {
      modalWindow.classList.add("hidden");
      modalWindow.innerHTML = "";
    }, 300);
  });
}

function visibleProjectsAddEventListener() {
  let clickedForModalIndex = 0;
  const visibleProjects = [...document.getElementsByClassName("project")];
  visibleProjects.forEach((project, index) => {
    project.addEventListener("click", function () {
      console.log(`Hello project ${index}`);
      clickedForModalIndex = index;
      console.log(clickedForModalIndex);
      generateProjectModalWindow(clickedForModalIndex);
    });
  });
}
