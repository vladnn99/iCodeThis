let bookedSeatsNumber = [5, 6, 7, 17, 18, 20, 22, 23, 34, 35, 37, 38, 44, 45];
let preSelectedSeats = [13, 14, 15];

const leftSeatsContainer = document.getElementById("leftSeatsContainer");
const rightSeatsContainer = document.getElementById("rightSeatsContainer");

for (let i = 0; i < 28; i++) {
  leftSeatsContainer.innerHTML = rightSeatsContainer.innerHTML += `<svg
xmlns="http://www.w3.org/2000/svg"
class="icon icon-tabler icon-tabler-armchair-2 w-6 h-6 seat"
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

let seats = document.querySelectorAll(".seat");

function setBookedSeats() {
  for (let i = 0; i < bookedSeatsNumber.length; i++)
    seats[bookedSeatsNumber[i]].classList.add("booked");
}

function preSelectSeats() {
  for (let i = 0; i < preSelectedSeats.length; i++)
    seats[preSelectedSeats[i]].classList.add("selected");
}

seats.forEach((seat) => {
  seat.addEventListener("click", selectSeat);
});

function selectSeat() {
  if (this.classList.value.includes("booked")) {
    alert("That seat is booked");
  } else {
    this.classList.toggle("selected");
  }
}

setBookedSeats();
preSelectSeats();
