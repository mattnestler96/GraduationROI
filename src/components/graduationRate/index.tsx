import React from "react";
import { ROI } from "../../models";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title} from "chart.js";
import { Pie } from "react-chartjs-2";
import randomColors from "../../utils/randomColors";
import Color from "color";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const labels = [
  "Share of students who graduate in 4 years",
  "Share of students who graduate in 5 years",
  "Share of students who graduate in 6 years",
  "Share of students who transfer out within 6 years",
  "Share of students still enrolled after 6 years",
  "Share of students who are no longer enrolled",
];

interface IROIGraph {
  items: ROI[];
  color: string;
}
export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Graduation Rate",
    },
  },
};

const ROIGraph = (props: IROIGraph) => {
  const data = {
    labels,
    datasets: props.items.map((v, k) => ({
      label: v.programName,
      data: [
        v.shareOfStudentWhoGraduateIn4Years,
        v.shareOfStudentWhoGraduateIn5Years,
        v.shareOfStudentWhoGraduateIn6Years,
        v.shareOfStudentWhoTransferOutIn6Years,
        v.shareOfStudentWhoRemainIn6Years,
        v.shareOfStudentWhoNoLongerEnrolledIn6Years,
      ],
      backgroundColor: [
        Color(randomColors[k]).string(),
        Color(randomColors[k]).lighten(0.1).string(),
        Color(randomColors[k]).lighten(0.2).string(),
        Color(randomColors[k]).lighten(0.3).string(),
        Color(randomColors[k]).lighten(0.4).string(),
        Color(randomColors[k]).lighten(0.5).string(),
      ],
      borderColor: ["#000", "#000", "#000", "#000", "#000", "#000"],
    })),
  };
  return <Pie data={data} style={{ maxHeight: '100%' }}/>;
};

export default ROIGraph;
