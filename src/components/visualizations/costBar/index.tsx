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
import { numberWithCommas } from "../../../utils/dataHelpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ROIGraph = () => {
  const { selectedPrograms, selectedColorMap } = useContext(Programs);
  const dataCost = {
    labels: ["Four Year Cost"],
    datasets: [...selectedPrograms]
      .sort(
        (a, b) =>
          (a.fourYearEducationRelatedSpending ?? 0) -
          (b.fourYearEducationRelatedSpending ?? 0)
      )
      .map((v) => ({
        label: v.programName,
        data: [v.fourYearEducationRelatedSpending],
        backgroundColor: selectedColorMap[v.id],
        roi: v,
      })),
  };
  return (
    <Box>
      <Title
        title="Is it affordable?"
        subtitle="Cost is a major factor on students deciding if college is possible at the moment."
      />
      <Box height="400px" paddingBottom="30px">
        <Bar
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  callback: (v) => {
                    return `$${numberWithCommas(
                      typeof v === 'string' ? parseInt(v, 10) : v
                    )}`;
                  },
                },
              },
            },
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
          data={dataCost}
        />
      </Box>
    </Box>
  );
};

export default ROIGraph;
