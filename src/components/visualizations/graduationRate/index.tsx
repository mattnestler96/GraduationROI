import React from "react";
import { ROI } from "../../../models";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import randomColors from "../../../utils/randomColors";
import Color from "color";
import Title from "../../tableHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = [
  "Percent of students who graduate in 4 years",
  "Percent of students who graduate in 5 years",
  "Percent of students who graduate in 6 years",
  "Percent of students who transfer out within 6 years",
  "Percent of students still enrolled after 6 years",
  "Percent of students who are no longer enrolled",
];

interface IROIGraph {
  items: ROI[];
}
export const options = {
  responsive: true,
};

const ROIGraph = (props: IROIGraph) => {
  const data = {
    labels,
    datasets: props.items.map((v, k) => ({
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
  return (
    <>
      <Title title="Graduation Rates" />
      <Pie data={data} style={{ maxHeight: "100%" }} />
    </>
  );
};

export default ROIGraph;
