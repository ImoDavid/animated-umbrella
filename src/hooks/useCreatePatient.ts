'use client';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPatient } from "@/actions/patient.actions";

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
