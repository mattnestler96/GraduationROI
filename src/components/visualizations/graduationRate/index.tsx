import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import Color from "color";
import Title from "../../tableHeader";
import { Box } from "@mui/material";
import { Programs } from "../../../contexts/programs";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = [
  "Percent of students who graduate in 4 years",
  "Percent of students who graduate in 5 years",
  "Percent of students who graduate in 6 years",
  "Percent of students who transfer out within 6 years",
  "Percent of students still enrolled after 6 years",
  "Percent of students who are no longer enrolled",
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
      borderColor: ["#000", "#000", "#000", "#000", "#000", "#000"],
      roi: v,
    })),
  };
  return (
    <Box height="400px" paddingBottom="30px">
      <Title title="Graduation Rates" />
      <Pie
        data={data}
        style={{ maxHeight: "100%" }}
        options={{
          plugins: {
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
