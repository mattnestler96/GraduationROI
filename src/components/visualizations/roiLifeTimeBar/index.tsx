import React, { useContext } from "react";
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
import { Box } from "@mui/material";
import { Programs } from "../../../contexts/programs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = ["Lifetime ROI", "Four Year Cost of Attendance"];

const ROIGraph = () => {
  const { selectedPrograms, selectedColorMap } = useContext(Programs);
  const data = {
    labels,
    datasets: selectedPrograms.map((v, k) => ({
      label: v.programName,
      data: [
        v.lifetimeReturnOnInvestmentROI,
        v.fourYearEducationRelatedSpending,
      ],
      backgroundColor: selectedColorMap[v.id],
      roi: v,
    })),
  };
  return (
    <Box height="400px" paddingBottom="30px">
      <Title title="Lifetime Return on Investment" />
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top" as const,
            },
            tooltip: {
              enabled: true,
              callbacks: {
                afterLabel: ({ dataset }) => {
                  const { roi } = dataset as any;
                  return `${roi.institutionName}`;
                },
              },
            },
          },
        }}
        data={data}
      />
    </Box>
  );
};

export default ROIGraph;
