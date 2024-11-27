// Get references to the HTML elements
const ctx = document.getElementById("functionGraph").getContext("2d");
const functionInput = document.getElementById("functionInput");
const minXInput = document.getElementById("minX");
const maxXInput = document.getElementById("maxX");
const updateButton = document.getElementById("updateGraph");
const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");
const resetZoomButton = document.getElementById("resetZoom");

// Initial chart data
let chart;

// Generate data points for the graph
function generateDataPoints(func, range) {
  const data = [];
  for (let x = range.minX; x <= range.maxX; x += range.step) {
    const y = eval(func); // Evaluate the user-defined function
    data.push({ x, y });
  }
  return data;
}

// Create the graph with Chart.js
function createGraph(func, range) {
  const dataPoints = generateDataPoints(func, range);

  if (chart) chart.destroy(); // Destroy the old chart if it exists

  chart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Custom Function",
          data: dataPoints,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          showLine: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        zoom: {
          pan: { enabled: true, mode: "xy" },
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "xy" },
        },
        annotation: {
          annotations: {
            startBorder: {
              type: "line",
              xMin: range.minX,
              xMax: range.minX,
              borderColor: "red",
              borderWidth: 2,
              label: {
                content: "Start",
                enabled: true,
                position: "end",
                backgroundColor: "rgba(255, 0, 0, 0.7)",
                color: "white",
              },
            },
            endBorder: {
              type: "line",
              xMin: range.maxX,
              xMax: range.maxX,
              borderColor: "blue",
              borderWidth: 2,
              label: {
                content: "End",
                enabled: true,
                position: "end",
                backgroundColor: "rgba(0, 0, 255, 0.7)",
                color: "white",
              },
            },
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "X-Axis" },
        },
        y: {
          title: { display: true, text: "Y-Axis" },
        },
      },
    },
  });
}

// Initialize the chart with the default function
const initialRange = { minX: Number(minXInput.value), maxX: Number(maxXInput.value), step: 0.1 };
createGraph(functionInput.value, initialRange);

// Update the chart with new parameters
updateButton.addEventListener("click", () => {
  try {
    const func = functionInput.value;
    const newRange = {
      minX: Number(minXInput.value),
      maxX: Number(maxXInput.value),
      step: 0.1,
    };
    createGraph(func, newRange);
  } catch (err) {
    alert("Invalid function or range! Please check your input.");
  }
});

// Zoom controls
zoomInButton.addEventListener("click", () => chart.zoom(1.2));
zoomOutButton.addEventListener("click", () => chart.zoom(0.8));
resetZoomButton.addEventListener("click", () => chart.resetZoom());