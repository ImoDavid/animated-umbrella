'use client';
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPatient, getPatients } from "@/actions/patient.actions";

export const useCreatePatient = () => {
  return useMutation({
    mutationFn: createPatient,

    onSuccess: () => { 
      toast.success("Patient created successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.message || "Failed to create patient. Please try again."
      );
    },
  });
};

// ---------------- Get Patients ----------------
export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
    staleTime: 1000 * 60, // 1 minute
    onError: (error: any) => {
      toast.error(error?.message || "Failed to fetch patients");
    },
  });
};