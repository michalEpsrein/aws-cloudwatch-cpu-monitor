import axios from "axios";
import type { CpuData } from "../types/aws";

const API_BASE_URL = "http://localhost:8080";

export const fetchCpuMetrics = async (
  instanceId: string,
  minutes: number
): Promise<CpuData[]> => {
  const response = await axios.get<CpuData[]>(`${API_BASE_URL}/cpu`, {
    params: { instanceId, minutes },
  });

  return response.data.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};
