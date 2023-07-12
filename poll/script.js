const optionButtons = [...document.getElementsByClassName("button")];
const checkboxes = [...document.getElementsByClassName("checkbox")];

console.log(optionButtons);

optionButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    checkboxes[index].checked = !checkboxes[index].checked;
  });
});
