// hooks/useAppointments.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAppointment, getAppointments } from "@/actions/patient.actions";
import { toast } from "react-toastify";

// ---------------- Create Appointment ----------------
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success("Appointment created successfully");
      queryClient.invalidateQueries(["appointments"]); // Refresh appointments
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "Failed to create appointment. Please try again."
      );
    },
  });
};

// ---------------- Get Appointments ----------------
export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    staleTime: 1000 * 60, // 1 minute
    onError: (error: any) => {
      toast.error(error?.message || "Failed to fetch appointments");
    },
  });
};


