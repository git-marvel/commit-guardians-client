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

function ChartContainer() {
  const commitList = useCommitStore((state) => state.commitInfo.commitList);

  const people = new Map();
  const type = new Map([
    ["remove", 0],
    ["docs", 0],
    ["style", 0],
    ["test", 0],
  ]);

  commitList.forEach((commit) => {
    const key = commit.type;
    type.set(key, type.get(key) + 1);

    const email = commit.author.email;
    const author = commit.author;

    if (people.has(email)) {
      const existing = people.get(email);
      people.set(email, { ...existing, count: existing.count + 1 });
    } else {
      people.set(email, { ...author, count: 1 });
    }
  });

  const top3 = Array.from(people.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
  const top3Map = new Map(
    top3.map((author) => [
      author.email,
      {
        ...author,
        type: new Map([
          ["remove", null],
          ["style", null],
          ["docs", null],
          ["test", null],
        ]),
      },
    ])
  );

  commitList.forEach((commit) => {
    const { type: commitType, author } = commit;
    const email = author.email;

    if (top3Map.has(email)) {
      const person = top3Map.get(email);
      person.type.set(commitType, (person.type.get(commitType) || 0) + 1);
    }
  });

  const top3Value = Array.from(top3Map.values());

  const pieData = {
    labels: Array.from(type.keys()),
    datasets: [
      {
        label: "Commits",
        data: Array.from(type.values()),
        backgroundColor: [
          "rgba(226, 232, 240, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(254, 215, 170, 1)",
          "rgba(252, 231, 243, 1)",
        ],
        borderColor: [
          "rgba(226, 232, 240, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(254, 215, 170, 1)",
          "rgba(252, 231, 243, 1)",
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
    afterDatasetDraw: (chart) => {
      const { width, ctx, data } = chart;
      const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

      ctx.save();
      ctx.font = "bold 12px Pretendard, sans-serif";
      ctx.fillStyle = "rgba(100, 100, 100, 1)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Total", width / 2, chart.chartArea.height * (3 / 4) - 21);

      ctx.font = "bold 48px Pretendard, sans-serif";
      ctx.fillText(`${total}`, width / 2, chart.chartArea.height * (3 / 4) + 9);

      ctx.restore();
    },
  };

  const sectionValuePlugin = {
    id: "sectionValue",
    afterDatasetDraw: (chart) => {
      const { ctx, data } = chart;
      const dataset = data.datasets[0];
      const total = dataset.data.reduce((a, b) => a + b, 0);
      const backgroundColor = ["#9ca2a8", "#696969", "#fc8600", "#ff3dab"];

      chart.getDatasetMeta(0).data.forEach((arc, index) => {
        const { x, y } = arc.tooltipPosition();
        const value = dataset.data[index];
        const percentage = ((value / total) * 100).toFixed(1);
        const sectionColor = backgroundColor[index];

        ctx.save();
        ctx.fillStyle = sectionColor;
        ctx.font = "bold 10px Pretendard, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (value !== 0) {
          ctx.fillText(`${value} (${percentage}%)`, x, y);
        }

        ctx.restore();
      });
    },
  };

  const barData = {
    labels: top3Value.map((value) => value.name),
    datasets: [
      {
        label: "reomve",
        data: top3Value.map((value) => value.type.get("remove")),
        backgroundColor: "rgba(226, 232, 240, 1)",
        borderColor: "rgba(226, 232, 240, 1)",
        borderWidth: 1,
      },
      {
        label: "docs",
        data: top3Value.map((value) => value.type.get("docs")),
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "style",
        data: top3Value.map((value) => value.type.get("style")),
        backgroundColor: "rgba(254, 215, 170, 1)",
        borderColor: "rgba(254, 215, 170, 1)",
        borderWidth: 1,
      },
      {
        label: "test",
        data: top3Value.map((value) => value.type.get("test")),
        backgroundColor: "rgba(252, 231, 243, 1)",
        borderColor: "rgba(252, 231, 243, 1)",
        borderWidth: 1,
      },
    ],
  };

  const customColors = ["#9ca2a8", "#696969", "#fc8600", "#ff3dab"];

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        anchor: (context) => {
          return context.datasetIndex === context.chart.data.datasets.length
            ? "end"
            : "center";
        },
        align: (context) => {
          return context.datasetIndex === context.chart.data.datasets.length
            ? "top"
            : "center";
        },
        formatter: (value, context) => {
          const datasetIndex = context.datasetIndex;
          const dataIndex = context.dataIndex;

          if (datasetIndex === context.chart.data.datasets.length) {
            const total = context.chart.data.datasets.reduce(
              (sum, dataset) => sum + dataset.data[dataIndex],
              0
            );
            return `Total: ${total}`;
          }
          return value;
        },
        color: (context) => {
          return context.datasetIndex === context.chart.data.datasets.length
            ? "black"
            : customColors[context.datasetIndex % customColors.length];
        },
        font: {
          size: 14,
          weight: "bold",
          family: "Pretendard, sans-serif",
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
        grid: {
          color: "transparent",
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          color: "transparent",
        },
      },
    },
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="h-60 w-60">
        <Doughnut
          data={pieData}
          options={pieOptions}
          plugins={[centerTextPlugin, sectionValuePlugin]}
        />
      </div>
      <div className="h-60 w-60">
        <Bar data={barData} options={barOptions} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
}

export default ChartContainer;
