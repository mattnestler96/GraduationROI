import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ROI } from "../../../models";
import Title from "../../tableHeader";
import { Box } from "@mui/material";
import { Programs } from "../../../contexts/programs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

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

type subROI =
  | "estimatedCounterfactualEarnings19"
  | "estimatedCounterfactualEarnings21"
  | "estimatedCounterfactualEarnings23"
  | "estimatedCounterfactualEarnings26"
  | "estimatedCounterfactualEarnings29"
  | "estimatedCounterfactualEarnings32"
  | "estimatedCounterfactualEarnings35"
  | "estimatedCounterfactualEarnings38"
  | "estimatedCounterfactualEarnings41"
  | "estimatedCounterfactualEarnings44"
  | "estimatedCounterfactualEarnings47"
  | "estimatedCounterfactualEarnings50"
  | "estimatedCounterfactualEarnings53"
  | "estimatedCounterfactualEarnings56"
  | "estimatedCounterfactualEarnings59"
  | "estimatedCounterfactualEarnings62";

const reduceItems = (items: ROI[]) => (field: subROI) => {
  return items.reduce((acc, v) => acc + (v?.[field] || 0), 0) / items.length;
};

const ROIGraph = () => {
  const { selectedPrograms, selectedColorMap } = useContext(Programs);
  const r = reduceItems(selectedPrograms);
  const counterFactualData = {
    label: "Counterfactual",
    data: [
      r("estimatedCounterfactualEarnings23"),
      r("estimatedCounterfactualEarnings26"),
      r("estimatedCounterfactualEarnings29"),
      r("estimatedCounterfactualEarnings32"),
      r("estimatedCounterfactualEarnings35"),
      r("estimatedCounterfactualEarnings38"),
      r("estimatedCounterfactualEarnings41"),
      r("estimatedCounterfactualEarnings44"),
      r("estimatedCounterfactualEarnings47"),
      r("estimatedCounterfactualEarnings50"),
      r("estimatedCounterfactualEarnings53"),
      r("estimatedCounterfactualEarnings56"),
      r("estimatedCounterfactualEarnings59"),
      r("estimatedCounterfactualEarnings62"),
    ],
  };
  const data = {
    labels,
    datasets: [
      counterFactualData,
      ...selectedPrograms.map((v, k) => ({
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
        backgroundColor: selectedColorMap[v.id],
        roi: v,
      })),
    ],
  };

  return (
    <Box height="400px" paddingBottom="30px">
      <Title
        title="What is possible with it?"
        subtitle="Projecting income based on an average career for a program modified by the advantage a school gives."
        info="Counterfactual: The amount that the same student would have earned over the course of her life had she not gone to college."
      />
      <Line
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
