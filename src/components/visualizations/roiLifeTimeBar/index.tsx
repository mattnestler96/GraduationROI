import { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import Title from "../../tableHeader";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import { Programs } from "../../../contexts/programs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ROIGraph = () => {
  const { selectedPrograms, selectedColorMap } = useContext(Programs);
  const dataROI = {
    labels: ["Lifetime ROI"],
    datasets: [...selectedPrograms]
      .sort(
        (a, b) =>
          (a.lifetimeReturnOnInvestmentROI ?? 0) -
          (b.lifetimeReturnOnInvestmentROI ?? 0)
      )
      .map((v) => ({
        label: v.programName,
        data: [v.lifetimeReturnOnInvestmentROI],
        backgroundColor: selectedColorMap[v.id],
        roi: v,
      })),
  };
  return (
    <Box>
      <Title
        title="Is it worth it?"
        subtitle="Lifetime return on investment calculated using increased earning potential vs cost of the program."
      />
      <Box height="400px" paddingBottom="30px">
        <Bar
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
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
          data={dataROI}
        />
      </Box>
    </Box>
  );
};

export default ROIGraph;
