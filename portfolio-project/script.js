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
      "https://raw.githubusercontent.com/vladnn99/iCodeThis/38012c94698ab35e5fba7d887a825c745a046be5/portfolio-project/files/image-34.png",
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
  projectDiv.className = "flex flex-col gap-2 mb-8 column-item cursor-pointer";
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
}

function addIds(menuLinks) {
  menuLinks.forEach((link, index) => {
    link.id = index;
  });
}

function getTargetSections() {
  menuLinks.forEach((link) => {
    // console.log(link);
    const targetId =
      link.getAttribute("href") !== "#" ? link.getAttribute("href") : "null";
    const targetSection = document.querySelector(targetId);
    targetSections.push({ targetSection: targetSection, targetOffset: "" });
  });
  const navTargetId = document.getElementById("navTop");
  // console.log(navTargetId);
  targetSections[0].targetOffset = 0;
  targetSections[0].targetSection = navTargetId;
  // targetSections.shift();
  targetSections[1].targetOffset =
    targetSections[1].targetSection.offsetTop - 88;
  targetSections[2].targetOffset = targetSections[2].targetSection.offsetTop;
  // console.log(targetSections);
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
  img.className = "object-cover w-full h-full";
  img.src = `${project.coverImage}`;
  img.style = "object-position: center top;";
  h2.innerText = `${project.Name}`;
  rightContainer.className = "w-3/5 flex flex-col gap-3 justify-center";
  rightContainer.id = "rightContainer";
  p.className = "text-xs font-semibold";
  p.innerHTML = `${project.Type} <span class="ml-2">2023</span>`;
  description.innerText = project.Description;
  description.className = "text-xs";
  projectDiv.className = "flex gap-14 mb-8 h-56";
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
}

const closeModalBtn = document.getElementById("closeModal");
const modalWindow = document.getElementById("modalWindow");
const body = document.body;

console.log(closeModalBtn);
closeModalBtn.addEventListener("click", function () {
  modalWindow.classList.add("opacity-0");
  setTimeout(function () {
    // body.classList.remove("overflow-hidden");
    modalWindow.classList.add("hidden");
  }, 300);
});
