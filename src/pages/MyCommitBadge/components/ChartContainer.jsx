import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useCommitStore from "../../../features/commit/store/useCommitStore";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ChartContainer = () => {
  const commitList = useCommitStore((state) => state.commitInfo.commitList);

  const people = new Map();
  const type = new Map([
    ["remove", 0],
    ["style", 0],
    ["docs", 0],
    ["test", 0],
  ]);

  commitList.forEach((element) => {
    const key = element.type;
    type.set(key, type.get(key) + 1);

    const email = element.author.email;
    const author = element.author;

    if (people.has(email)) {
      const existing = people.get(email);
      people.set(email, { ...existing, count: existing.count + 1 });
    } else {
      people.set(email, { ...author, count: 1 });
    }
  });

  const pieData = {
    labels: Array.from(type.keys()),
    datasets: [
      {
        label: "Commits",
        data: Array.from(type.values()),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        display: true,
      },
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, ctx, data } = chart;
      const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

      ctx.save();
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "rgba(100, 100, 100, 1)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const centerX = width / 2;
      const centerY = chart.chartArea.height * (3 / 4) + 2;
      ctx.fillText(`Total: ${total}`, centerX, centerY);

      ctx.restore();
    },
  };

  const sectionValuePlugin = {
    id: "sectionValue",
    afterDatasetDraw: (chart) => {
      const { ctx, data } = chart;
      const dataset = data.datasets[0];
      const total = dataset.data.reduce((a, b) => a + b, 0);
      const backgroundColor = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ];

      chart.getDatasetMeta(0).data.forEach((arc, index) => {
        const { x, y } = arc.tooltipPosition();
        const value = dataset.data[index];
        const percentage = ((value / total) * 100).toFixed(1);
        const sectionColor = backgroundColor[index];

        ctx.save();
        ctx.fillStyle = sectionColor;
        ctx.font = "bold 10px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(`${value} (${percentage}%)`, x, y);

        ctx.restore();
      });
    },
  };

  const barData = {
    labels: Array.from(people.values().map((element) => element.name)),
    datasets: [
      {
        label: "Commits",
        data: Array.from(people.values().map((element) => element.count)),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "rgba(75, 192, 192, 1)",
        anchor: "end",
        align: "top",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "transparent",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "transparent",
        },
      },
    },
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="h-64 w-64">
        <Doughnut
          data={pieData}
          options={pieOptions}
          plugins={[centerTextPlugin, sectionValuePlugin]}
        />
      </div>
      <div className="h-64 w-64">
        <Bar data={barData} options={barOptions} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default ChartContainer;
