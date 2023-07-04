const movies = [
  {
    id: 0,
    title: "Guardians of the Galaxy Vol. 2",
    headerPoster:
      "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_FMjpg_UX1000_.jpg",
    seats: "",
    nrSeats: 0,
    nrTickets: 0,
    totalPrice: "",
    bookedSeats: [5, 6, 7, 17, 18, 20, 22, 23, 34, 35, 37, 38, 44, 45],
    preselectedSeats: [13, 14, 15],
  },
  {
    id: 1,
    title: "Iron Man",
    headerPoster:
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/80C64C0B63382CD3ED2653356125F275F63D036028A77D38DC3286AD851A6833/scale?width=1200&aspectRatio=1.78&format=jpeg",
    seats: "",
    nrSeats: 0,
    nrTickets: 0,
    totalPrice: "",
    bookedSeats: [5, 6, 7, 17, 18, 20, 22, 23, 34, 35, 37, 38, 44, 45],
    preselectedSeats: [1, 2, 3],
  },
  {
    id: 2,
    title: "Transformers",
    headerPoster:
      "https://w0.peakpx.com/wallpaper/622/658/HD-wallpaper-transformers-1-the-saga-begins-hot-new-movies-cars.jpg",
    seats: "",
    nrSeats: 0,
    nrTickets: 0,
    totalPrice: "",
    bookedSeats: [5, 6, 7, 17, 18, 20, 22, 23, 34, 35, 37, 38, 44, 45],
    preselectedSeats: [25, 26, 27],
  },
  {
    id: 3,
    title: "Interstellar",
    headerPoster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    seats: "",
    nrSeats: 0,
    nrTickets: 0,
    totalPrice: "",
    bookedSeats: [5, 6, 7, 17, 18, 20, 22, 23, 34, 35, 37, 38, 44, 45],
    preselectedSeats: [38, 39, 40],
  },
];

console.log(movies);

// Setting date
(function setDate() {
  const currentDate = new Date();
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );
  let shownDate = document.getElementById("currentDate");
  shownDate.innerText = formattedDate;
})();

const titlesContainer = document.getElementById("titlesContainer");
const container = document.getElementById("container");

(function generateButtons() {
  movies.forEach((movie, index) => {
    const buttonElement = document.createElement("button");
    buttonElement.className =
      "bg-pink-400 py-2 rounded-lg hover:translate-x-2 transition-transform duration-300 ease-in-out button";
    buttonElement.textContent = movie.title;
    buttonElement.id = index;
    // console.log(buttonElement);
    titlesContainer.appendChild(buttonElement);
    // console.log(buttonElement);
  });
})();

(function addClickToButton() {
  buttons = Array.from(document.getElementsByClassName("button"));
  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const clickedButtonId = +event.target.id;
      setBookedSeats(clickedButtonId);
      preselectSeats(clickedButtonId);
      handleButtonClick(event, clickedButtonId);
      addSeatId(clickedButtonId);
    });
  });
})();

function handleButtonClick(event, clickedButtonId) {
  titlesContainer.classList.add("opacity-0");
  setTimeout(() => {
    titlesContainer.remove();
  }, 250);

  container.classList.remove("hidden");

  setTimeout(() => {
    container.classList.remove("opacity-0");
    container.classList.add("opacity-100");
  }, 250);
}

const leftSeatsContainer = document.getElementById("leftSeatsContainer");
const rightSeatsContainer = document.getElementById("rightSeatsContainer");

(function populateSeatContainers() {
  for (let i = 0; i < 28; i++) {
    leftSeatsContainer.innerHTML = rightSeatsContainer.innerHTML += `<svg
xmlns="http://www.w3.org/2000/svg"
class="icon icon-tabler icon-tabler-armchair-2 w-6 h-6 seat cursor-pointer"
width="24"
height="24"
viewBox="0 0 24 24"
stroke-width="2"
stroke="#5C889D"
fill="#5C889D"
stroke-linecap="round"
stroke-linejoin="round"
>
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M5 10v-4a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v4"></path>
<path d="M16 15v-2a3 3 0 1 1 3 3v3h-14v-3a3 3 0 1 1 3 -3v2"></path>
<path d="M8 12h8"></path>
<path d="M7 19v2"></path>
<path d="M17 19v2"></path>
</svg>`;
  }
})();

let seats = document.querySelectorAll(".seat");

function addSeatId(clickedButtonId) {
  seats.forEach((seat, index) => {
    seat.addEventListener("click", function () {
      const boundSelectSeat = selectSeat.bind(this);
      boundSelectSeat(clickedButtonId);
    });
    seat.id = index;
  });
}
function selectSeat(clickedButtonId) {
  // console.log(this);
  console.log(clickedButtonId);
  if (this.classList.value.includes("booked")) {
    alert("That seat is booked");
  } else {
    this.classList.toggle("selected");
    if (!movies[clickedButtonId].preselectedSeats.includes(+this.id))
      movies[clickedButtonId].preselectedSeats.push(+this.id);
    else if (movies[clickedButtonId].preselectedSeats.includes(+this.id))
      movies[clickedButtonId].preselectedSeats.pop(+this.id);
    console.log(movies);
    countTickets();
  }
}

function setBookedSeats(clickedButtonId) {
  for (let i = 0; i < movies[clickedButtonId].bookedSeats.length; i++) {
    seats[movies[clickedButtonId].bookedSeats[i]].classList.add("booked");
    seats[movies[clickedButtonId].bookedSeats[i]].classList.remove(
      "cursor-pointer"
    );
  }
}

function preselectSeats(clickedButtonId) {
  for (let i = 0; i < movies[clickedButtonId].preselectedSeats.length; i++)
    seats[movies[clickedButtonId].preselectedSeats[i]].classList.add(
      "selected"
    );
}

// setBookedSeats();
// preSelectSeats();
countTickets();

function countTickets() {
  let count = 0;
  let ticketsNr = document.getElementById("ticketsNr");
  seats.forEach((seat) => {
    if (seat.classList.value.includes("selected")) count++;
  });
  ticketsNr.innerText = count;
  let ticketTotal = document.getElementById("total");
  ticketTotal.innerText = `$${count * 10}`;
}
