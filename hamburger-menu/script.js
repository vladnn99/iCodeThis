console.log("Hello world");
const hamburgerButton = document.querySelector("#hamburgerButton");
const hamburgerMenu = document.querySelector("#hamburgerMenu");
const line1 = document.querySelector("#line1");
const line2 = document.querySelector("#line2");
const line3 = document.querySelector("#line3");
const hamburgerLinks = [...document.querySelectorAll(".hamburger-links")];
console.log(hamburgerButton);
console.log(hamburgerLinks);

function transformHamburgerButton() {
  if (!line2.classList.contains("opacity-0")) {
    line2.classList.add("opacity-0");
    line1.classList.add("rotate-45", "translate-y-[0.67rem]", "bg-white");
    line3.classList.add("-rotate-45", "-translate-y-[0.67rem]", "bg-white");
    hamburgerMenu.classList.remove("translate-x-full");
  } else {
    line2.classList.remove("opacity-0");
    line1.classList.remove("rotate-45", "translate-y-[0.67rem]", "bg-white");
    line3.classList.remove("-rotate-45", "-translate-y-[0.67rem]", "bg-white");
    hamburgerMenu.classList.add("translate-x-full");
  }
}

function goToHamburgerLinks(link) {
  transformHamburgerButton();
}

hamburgerButton.addEventListener("click", transformHamburgerButton);
hamburgerLinks.forEach((link) => {
  link.addEventListener("click", goToHamburgerLinks);
});
