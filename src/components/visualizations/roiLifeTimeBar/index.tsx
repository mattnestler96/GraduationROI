import React from "react";
import { ROI } from "../../../models";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import Title from "../../tableHeader";
import { Bar } from "react-chartjs-2";
import randomColors from "../../../utils/randomColors";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Lifetime ROI", "Four Year Cost of Attendance"];

interface IROIGraph {
  items: ROI[];
}

const ROIGraph = (props: IROIGraph) => {
  const data = {
    labels,
    datasets: props.items.map((v, k) => ({
      label: v.programName,
      data: [v.lifetimeReturnOnInvestmentROI, v.fourYearEducationRelatedSpending],
      backgroundColor: randomColors[k],
    })),
  };
  return (
    <Box height="400px" paddingBottom="30px">
      <Title title="Lifetime Return on Investment" />
      <Bar options={options} data={data} />
    </Box>
  );
};

export default ROIGraph;
