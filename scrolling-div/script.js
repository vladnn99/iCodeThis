const scrollingDiv = document.getElementById("scrolling-div");

window.addEventListener("scroll", () => {
  // Get the current scroll position
  const scrollY = window.scrollY;

  // Calculate the new translate-y value based on the scroll position
  const translateY = scrollY - 24;

  // Update the transform property of the div using Tailwind CSS classes
  scrollingDiv.style.transform = `translateY(${translateY}px)`;
});
