import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CpuData } from "../types/aws";

interface Props {
  data: CpuData[];
}

export const CpuChart = ({ data }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        backgroundColor: "#f9f9f9",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(str) =>
              new Date(str).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          />
          // במקום domain={[0, 100]}
          <YAxis unit="%" domain={["auto", "auto"]} />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleString()}
          />
          <Line
            type="monotone"
            dataKey="average"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="CPU Usage"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
