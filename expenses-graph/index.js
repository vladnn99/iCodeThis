// Add JavaScript code here
console.log("hello world console rocks");

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Income",
      data: [3800, 2200, 1800, 3500, 2100, 1400, 500],
      backgroundColor: ["rgb(112,115,244)"],
      borderColor: ["white"],
      borderWidth: 3,
      barThickness: 12,
    },
    {
      label: "Expenses",
      data: [1800, 800, 300, 1800, 1200, 800, 100],
      backgroundColor: ["rgb(234,126,181)"],
      //   borderColor: ["black"],
      //   borderWidth: 5,
      barThickness: 3,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    borderRadius: 20,
    scales: {
      x: {
        grid: {
          display: false, // Hide the vertical grid lines
          drawBorder: false, // Hide the x-axis border
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000,
          callback: (value) => {
            if (value === 0) return "0";
            const formattedValue = new Intl.NumberFormat("en-US", {
              style: "decimal",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(value / 1000);

            return formattedValue + "K";
          },
        },
      },
    },
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    events: ["click", "hover"], // Disable default events
    onHover: function () {}, // Empty function for hover event
    onClick: function () {}, // Empty function for click event
  },
};

const myBarChart = new Chart(document.getElementById("myChart"), config);
