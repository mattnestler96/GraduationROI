import React from "react";
import { ROI } from "../../../models";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Title from "../../tableHeader";
import { Bubble } from "react-chartjs-2";
import randomColors from "../../../utils/randomColors";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const labels = ["Lifetime ROI", "Four Year Cost of Attendance"];

const MIN_BUBBLE_SIZE = 20;
const RANGE_OF_BUBBLE_SIZE = 30;
const normalizeSize = (r: number, max: number, min: number): number => {
  const range = max - min;
  return Math.floor(
    ((r - min) / range) * RANGE_OF_BUBBLE_SIZE + MIN_BUBBLE_SIZE
  );
};

interface IROIGraph {
  items: ROI[];
}

const ROIGraph = (props: IROIGraph) => {
  const cohort = props.items.map((v) => v.collegeScorecardCohortCount || 1);
  const maxCohort = Math.max(...cohort) + 1;
  const minCohort = Math.min(...cohort);
  const data = {
    labels,
    datasets: props.items.map((v, k) => ({
      label: v.programName,
      data: [
        {
          y: v.lifetimeReturnOnInvestmentROI,
          x: v.fourYearEducationRelatedSpending,
          r: normalizeSize(
            v.collegeScorecardCohortCount || 1,
            maxCohort,
            minCohort
          ),
        },
      ],
      backgroundColor: randomColors[k],
    })),
  };
  return (
    <>
      <Title
        title="Lifetime Return on Investment vs Cost vs Relative Cohort Size"
        info="The vertical axis shows the lifetime ROI. The horizontal axis shows the total cost of attendance. The bubble size gives a comparison of the size of the cohort. When picking a degree, it is important to balance these three. Low cost and High return only means so much if only a select few successfully make it through the program."
      />
      <Bubble
        data={data}
      />
    </>
  );
};

export default ROIGraph;
