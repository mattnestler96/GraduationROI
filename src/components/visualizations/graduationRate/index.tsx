import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import Color from "color";
import Title from "../../tableHeader";
import { Box } from "@mui/material";
import { Programs } from "../../../contexts/programs";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = [
  "% graduating in 4 years",
  "% graduating in  in 5 years",
  "% graduating in  in 6 years",
  "% transferring out within 6 years",
  "% enrolled after 6 years",
  "% no longer enrolled",
];

export const options = {
  responsive: true,
};

const ROIGraph = () => {
  const { selectedPrograms, selectedColorMap } = useContext(Programs);
  const data = {
    labels,
    datasets: selectedPrograms.map((v) => ({
      label: v.programName,
      data: [
        (v.shareOfStudentWhoGraduateIn4Years || 0) * 100,
        (v.shareOfStudentWhoGraduateIn5Years || 0) * 100,
        (v.shareOfStudentWhoGraduateIn6Years || 0) * 100,
        (v.shareOfStudentWhoTransferOutIn6Years || 0) * 100,
        (v.shareOfStudentWhoRemainIn6Years || 0) * 100,
        (v.shareOfStudentWhoNoLongerEnrolledIn6Years || 0) * 100,
      ],
      backgroundColor: [
        Color(selectedColorMap[v.id]).string(),
        Color(selectedColorMap[v.id]).lighten(0.1).string(),
        Color(selectedColorMap[v.id]).lighten(0.2).string(),
        Color(selectedColorMap[v.id]).lighten(0.3).string(),
        Color(selectedColorMap[v.id]).lighten(0.4).string(),
        Color(selectedColorMap[v.id]).lighten(0.5).string(),
      ],
      roi: v,
    })),
  };
  return (
    <Box height="400px" paddingBottom="30px">
      <Title
        title="Can it be finished on-time?"
        subtitle="When a program can be completed in 4 years you're more likely to find college to be worth your time."
      />
      <Pie
        data={data}
        style={{ maxHeight: "100%" }}
        options={{
          plugins: {
            legend: {
              position: "right",
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: ({ dataset, dataIndex }) => {
                  return `${dataset.label}: ${dataset.data[dataIndex]}%`;
                },
                afterLabel: ({ dataset }) => {
                  const { roi } = dataset as any;
                  return `${roi.institutionName}`;
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default ROIGraph;
