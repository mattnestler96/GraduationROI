import React from "react";
import { ROI } from "../../models";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Title from "../tableHeader";
import { Bubble } from "react-chartjs-2";
import randomColors from "../../utils/randomColors";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);


const labels = ["Lifetime ROI", "Four Year Cost of Attendance"];

interface IROIGraph {
  items: ROI[];
}

const ROIGraph = (props: IROIGraph) => {
  const maxCohort = Math.max(
    ...props.items.map((v) => v.collegeScorecardCohortCount || 1)
  );
  const data = {
    labels,
    datasets: props.items.map((v, k) => ({
      label: v.programName,
      data: [
        {
          y: v.lifetimeReturnOnInvestmentROI,
          x: v.fourYearEducationRelatedSpending,
          r: ((v.collegeScorecardCohortCount || 1) / maxCohort) * 50,
        },
      ],
      backgroundColor: randomColors[k],
    })),
  };
  return (
    <>
      <Title title="Lifetime Return on Investment" />
      <Bubble data={data} />
    </>
  );
};

export default ROIGraph;
