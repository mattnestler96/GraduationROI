import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import { UserInfo } from "../../../../models";
import { convertAWSJSON } from "../../../../utils/dataHelpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const initialData = {
  dayPreferences: {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  },
  timePreferences: {
    Morning: 0,
    Midday: 0,
    Evening: 0,
    Night: 0,
  },
  modalityPreferences: {
    Online: 0,
    Inperson: 0,
  }
};
type IDays = keyof typeof initialData.dayPreferences;
type ITimes = keyof typeof initialData.timePreferences;
type IModalities = keyof typeof initialData.modalityPreferences;
type IUserValues = IDays | ITimes | IModalities;
export type IUserInfoGraphKeys = keyof typeof initialData;

const UserInfoGraph = ({
  selectedUsers,
  type,
}: {
  selectedUsers: UserInfo[];
  type: IUserInfoGraphKeys;
}) => {
  const labels = Object.keys(initialData[type]);
  const combined: Record<string, number> = { ...initialData[type] };
  selectedUsers.forEach((u) => {
    Object.entries(convertAWSJSON(u[type]) as Record<IUserValues, boolean>).forEach(
      ([key, isOn]) => {
        if (isOn) {
          combined[key] += 1;
        }
      }
    );
  });
  const data = {
    labels,
    datasets: [{ data: Object.values(combined), label: 'Student Count' }],
  };
  return (
    <Box height="400px" paddingBottom="30px">
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top" as const,
            },
          },
        }}
        data={data}
      />
    </Box>
  );
};

export default UserInfoGraph;
