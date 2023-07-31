console.log(`Hello world`);
const nav = document.querySelector("nav");
console.log(nav);

const handleScroll = () => {
  const scrollY = window.scrollY;

  // Add or remove the "scrolled" class based on the scroll position
  if (scrollY > 25) {
    nav.classList.add("fixed", "top-0", "opacity-0");
    setTimeout(function () {
      nav.classList.add("opacity-100");
      nav.classList.remove("opacity-0");
    }, 500);
  }
};

window.addEventListener("scroll", handleScroll);
