import React from "react";
import { ROI } from "../../models";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import randomColors from "../../utils/randomColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Lifetime ROI'];

interface IROIGraph {
  items: ROI[];
}

const ROIGraph = (props: IROIGraph) => {
  const data = {
    labels,
    datasets: props.items.map((v, k) => ({
      label: v.programName,
      data: [
        v.lifetimeReturnOnInvestmentROI,
      ],
      backgroundColor: randomColors[k],
    })),
  };
  return <Bar options={options} data={data} />;
};

export default ROIGraph;
