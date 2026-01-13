import { getActivityLogs } from "@/actions/patient.actions";
import { useQuery } from "@tanstack/react-query";

export const useActivityLogs = () => {
  return useQuery({
    queryKey: ["activity-logs"],
    queryFn: getActivityLogs,
    staleTime: 1000 * 60, // 1 minute
  });
};
