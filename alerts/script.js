// console.log("hello world");

const alertTypes = [
  {
    id: 0,
    type: "s",
    svgS: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-check"
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
    <path d="M5 12l5 5l10 -10"></path>
    </svg>`,
    svgU: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-x"
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
  </svg>`,
    sText: `Your object has been successfuly created`,
    uText: `Your object could not be created`,
    alertDivClassName: `bg-teal-50 w-full md:w-3/5 h-20 max-w-3xl shadow-xl flex items-center gap-4 p-8 transition-opacity duration-300`,
    checkContainerClassNameS: `flex justify-center items-center bg-green-500 w-8 h-8 rounded-full text-white`,
    checkContainerClassNameU: `flex justify-center items-center bg-red-500 w-8 h-8 rounded-full text-white`,
    pargraphClassNameS: `text-green-500 text-xs font-semibold`,
    paragraphClassNameU: `text-red-500 text-xs font-semibold`,
    svgClose: `<svg
xmlns="http://www.w3.org/2000/svg"
class="icon icon-tabler icon-tabler-x"
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
</svg>`,
  },
  {
    id: 1,
    type: "u",
    svgS: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-check"
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
    <path d="M5 12l5 5l10 -10"></path>
    </svg>`,
    svgU: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-x"
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
  </svg>`,
    sText: `Your object has been successfuly created`,
    uText: `Your object could not be created`,
    alertDivClassName: `bg-teal-50 w-full md:w-3/5 h-20 max-w-3xl shadow-xl flex items-center gap-4 p-8 transition-opacity duration-300`,
    checkContainerClassNameS: `flex justify-center items-center bg-green-500 w-8 h-8 rounded-full text-white`,
    checkContainerClassNameU: `flex justify-center items-center bg-red-500 w-8 h-8 rounded-full text-white`,
    pargraphClassNameS: `text-green-500 text-xs font-semibold`,
    paragraphClassNameU: `text-red-500 text-xs font-semibold`,
    svgClose: `<svg
xmlns="http://www.w3.org/2000/svg"
class="icon icon-tabler icon-tabler-x"
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
</svg>`,
  },
];

const alerts = [
  alertTypes[0],
  alertTypes[1],
  //   {
  //     id: 0,
  //     type: "s",
  //     svgS: `<svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     class="icon icon-tabler icon-tabler-check"
  //     width="24"
  //     height="24"
  //     viewBox="0 0 24 24"
  //     stroke-width="2"
  //     stroke="currentColor"
  //     fill="none"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //     >
  //     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  //     <path d="M5 12l5 5l10 -10"></path>
  //     </svg>`,
  //     svgU: `<svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     class="icon icon-tabler icon-tabler-x"
  //     width="24"
  //     height="24"
  //     viewBox="0 0 24 24"
  //     stroke-width="2"
  //     stroke="currentColor"
  //     fill="none"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   >
  //     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  //     <path d="M18 6l-12 12"></path>
  //     <path d="M6 6l12 12"></path>
  //   </svg>`,
  //     sText: `Your object has been successfuly created`,
  //     uText: `Your object could not be created`,
  //     alertDivClassName: `bg-teal-50 w-3/5 h-20 max-w-3xl shadow-xl flex items-center gap-4 p-8 transition-opacity duration-300`,
  //     checkContainerClassNameS: `flex justify-center items-center bg-green-500 w-8 h-8 rounded-full text-white`,
  //     checkContainerClassNameU: `flex justify-center items-center bg-red-500 w-8 h-8 rounded-full text-white`,
  //     pargraphClassNameS: `text-green-500 text-xs font-semibold`,
  //     paragraphClassNameU: `text-red-500 text-xs font-semibold`,
  //     svgClose: `<svg
  // xmlns="http://www.w3.org/2000/svg"
  // class="icon icon-tabler icon-tabler-x"
  // width="24"
  // height="24"
  // viewBox="0 0 24 24"
  // stroke-width="2"
  // stroke="currentColor"
  // fill="none"
  // stroke-linecap="round"
  // stroke-linejoin="round"
  // >
  // <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  // <path d="M18 6l-12 12"></path>
  // <path d="M6 6l12 12"></path>
  // </svg>`,
  //   },
  //   {
  //     id: 1,
  //     type: "u",
  //     svgS: `<svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     class="icon icon-tabler icon-tabler-check"
  //     width="24"
  //     height="24"
  //     viewBox="0 0 24 24"
  //     stroke-width="2"
  //     stroke="currentColor"
  //     fill="none"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //     >
  //     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  //     <path d="M5 12l5 5l10 -10"></path>
  //     </svg>`,
  //     svgU: `<svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     class="icon icon-tabler icon-tabler-x"
  //     width="24"
  //     height="24"
  //     viewBox="0 0 24 24"
  //     stroke-width="2"
  //     stroke="currentColor"
  //     fill="none"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   >
  //     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  //     <path d="M18 6l-12 12"></path>
  //     <path d="M6 6l12 12"></path>
  //   </svg>`,
  //     sText: `Your object has been successfuly created`,
  //     uText: `Your object could not be created`,
  //     alertDivClassName: `bg-teal-50 w-3/5 h-20 max-w-3xl shadow-xl flex items-center gap-4 p-8 transition-opacity duration-300`,
  //     checkContainerClassNameS: `flex justify-center items-center bg-green-500 w-8 h-8 rounded-full text-white`,
  //     checkContainerClassNameU: `flex justify-center items-center bg-red-500 w-8 h-8 rounded-full text-white`,
  //     pargraphClassNameS: `text-green-500 text-xs font-semibold`,
  //     paragraphClassNameU: `text-red-500 text-xs font-semibold`,
  //     svgClose: `<svg
  // xmlns="http://www.w3.org/2000/svg"
  // class="icon icon-tabler icon-tabler-x"
  // width="24"
  // height="24"
  // viewBox="0 0 24 24"
  // stroke-width="2"
  // stroke="currentColor"
  // fill="none"
  // stroke-linecap="round"
  // stroke-linejoin="round"
  // >
  // <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  // <path d="M18 6l-12 12"></path>
  // <path d="M6 6l12 12"></path>
  // </svg>`,
  //   },
];

renderButton();

function renderAlert(alert) {
  const button = document.getElementById("button");
  const containerDiv = document.getElementById("container");
  const alertDiv = document.createElement("div");
  alertDiv.id = alert.id + alert.type;
  alertDiv.className = alert.alertDivClassName;
  containerDiv.insertBefore(alertDiv, button);
  const checkContainer = document.createElement("div");
  checkContainer.id = "checkContainer" + alert.id + alert.type;
  if (alert.type === "s") {
    checkContainer.className = alert.checkContainerClassNameS;
    checkContainer.innerHTML = alert.svgS;
    const paragraph = document.createElement("p");
    paragraph.className = alert.pargraphClassNameS;
    paragraph.innerText = alert.sText;
    alertDiv.appendChild(checkContainer);
    alertDiv.appendChild(paragraph);
  }
  if (alert.type === "u") {
    checkContainer.className = alert.checkContainerClassNameU;
    checkContainer.innerHTML = alert.svgU;
    const paragraph = document.createElement("p");
    paragraph.className = alert.paragraphClassNameU;
    paragraph.innerText = alert.uText;
    alertDiv.appendChild(checkContainer);
    alertDiv.appendChild(paragraph);
  }

  const closeContainerDiv = document.createElement("div");
  closeContainerDiv.className = `flex justify-center items-center text-gray-400 w-8 h-8 ml-auto cursor-pointer close`;
  alertDiv.appendChild(closeContainerDiv);
  const svgClose = ` <svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-x"
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
  closeContainerDiv.innerHTML = svgClose;
}

function renderAlertsInit() {
  alerts.forEach((alert) => renderAlert(alert));
}

renderAlertsInit();
addCloseListenersInit();

function renderButton() {
  const button = document.createElement("button");
  button.className =
    "px-6 py-3 bg-teal-200 rounded-sm shadow-xl hover:translate-y-1 duration-300";
  button.innerText = "Create object";
  button.id = "button";
  const containerDiv = document.getElementById("container");
  button.addEventListener("click", addAndRenderItem);
  containerDiv.appendChild(button);
  console.log(containerDiv);
}

let i = 0;
function addAndRenderItem() {
  alerts.push(alertTypes[i]);
  alerts[alerts.length - 1].id = alerts.length - 1;
  renderAlert(alerts[alerts.length - 1]);
  const closeBtn = document.querySelector(".close:not(.addedClose)");
  addCloseListner(closeBtn);
  closeBtn.classList.add("addedClose");
  i === 0 ? (i = 1) : (i = 0);
}

function addCloseListenersInit() {
  const closeBtns = [...document.getElementsByClassName("close")];
  closeBtns.forEach((button) => {
    button.addEventListener("click", addCloseListner(button));
    button.classList.add("addedClose");
  });
}

function addCloseListner(button) {
  button.addEventListener("click", function (event) {
    const parentDiv = event.currentTarget.parentElement;
    parentDiv.classList.add("opacity-0");
    setTimeout(function () {
      parentDiv.classList.add("hidden");
    }, 310);
    alerts.pop();
  });
}
