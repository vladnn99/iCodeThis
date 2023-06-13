const data1 = {
  labels: ["Red", "White"],
  datasets: [
    {
      data: [26, 74],
      backgroundColor: ["#E3000E", "#f3f3f3"],
      borderWidth: 0,
      cutout: "90%",
      borderRadius: 3,
    },
  ],
};

const config1 = {
  type: "doughnut",
  data: data1,
  options: {
    events: ["click", "hover"], // Disable default events
    onHover: function () {}, // Empty function for hover event
    onClick: function () {}, // Empty function for click event
    animation: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  },
};

const data2 = {
  labels: ["Red", "White"],
  datasets: [
    {
      data: [63, 37],
      backgroundColor: ["#E3000E", "#f3f3f3"],
      borderWidth: 0,
      cutout: "90%",
      borderRadius: 3,
    },
  ],
};

const config2 = {
  type: "doughnut",
  data: data2,
  // plugins: ,
  options: {
    events: ["click", "hover"], // Disable default events
    onHover: function () {}, // Empty function for hover event
    onClick: function () {}, // Empty function for click event
    animation: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  },
};

const data3 = {
  labels: ["Red", "White"],
  datasets: [
    {
      data: [8, 92],
      backgroundColor: ["#E3000E", "#f3f3f3"],
      borderWidth: 0,
      cutout: "90%",
      borderRadius: 3,
    },
  ],
};

const config3 = {
  type: "doughnut",
  data: data3,
  // plugins: ,
  options: {
    events: ["click", "hover"], // Disable default events
    onHover: function () {}, // Empty function for hover event
    onClick: function () {}, // Empty function for click event
    animation: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  },
};

const data4 = {
  labels: ["Red", "White"],
  datasets: [
    {
      data: [3, 97],
      backgroundColor: ["#E3000E", "#f3f3f3"],
      borderWidth: 0,
      cutout: "90%",
      borderRadius: 3,
    },
  ],
};

const config4 = {
  type: "doughnut",
  data: data4,
  // plugins: ,
  options: {
    events: ["click", "hover"], // Disable default events
    onHover: function () {}, // Empty function for hover event
    onClick: function () {}, // Empty function for click event
    animation: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  },
};

// Create a new chart instance
const myChart1 = new Chart(document.getElementById("myChart1"), config1);
const myChart2 = new Chart(document.getElementById("myChart2"), config2);
const myChart3 = new Chart(document.getElementById("myChart3"), config3);
const myChart4 = new Chart(document.getElementById("myChart4"), config4);

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dataLineChart = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [8000, 12000, 10000, 20000, 29000, 20000, 20000],
      fill: false,
      borderColor: "black",
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
      borderCapStyle: "round",
    },
    {
      label: "My Second Dataset",
      data: [22000, 38000, 18000, 32000, 2000, 25000, 32000],
      fill: false,
      borderColor: "lightgray",
      borderDash: [3, 3], // Set the border to a dotted line
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
      borderJoinStyle: "round",
    },
  ],
};

const configLine = {
  type: "line",
  data: dataLineChart,
  options: {
    events: ["click", "hover"], // Disable default events
    onHover: function () {}, // Empty function for hover event
    onClick: function () {}, // Empty function for click event
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide the vertical grid lines
          drawBorder: false, // Hide the x-axis border
        },
      },
      y: {
        ticks: {
          stepSize: 10000,
          callback: (value) => {
            const formattedValue = new Intl.NumberFormat("en-US", {
              style: "decimal",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(value);

            return "€" + formattedValue.replace(/,/g, ".");
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [5, 5],
          drawBorder: false,
        },
      },
    },
  },
};

const myDataLineChart = new Chart(
  document.getElementById("lineChart"),
  configLine
);
