import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ROI } from "../../models";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Estimated Earning by Age",
    },
  },
};

const labels = [
  "23",
  "26",
  "29",
  "32",
  "35",
  "38",
  "41",
  "44",
  "47",
  "50",
  "53",
  "56",
  "59",
  "62",
];

interface IROIGraph {
  items: ROI[];
}

const ROIGraph = (props: IROIGraph) => {
  const data = {
    labels,
    datasets: props.items.map((v) => ({
      label: v.programName,
      data: [
        v.estimatedEarnings23,
        v.estimatedEarnings26,
        v.estimatedEarnings29,
        v.estimatedEarnings32,
        v.estimatedEarnings35,
        v.estimatedEarnings38,
        v.estimatedEarnings41,
        v.estimatedEarnings44,
        v.estimatedEarnings47,
        v.estimatedEarnings50,
        v.estimatedEarnings53,
        v.estimatedEarnings56,
        v.estimatedEarnings59,
        v.estimatedEarnings62,
      ],
    })),
  };
  return <Line options={options} data={data} />;
};

export default ROIGraph;
