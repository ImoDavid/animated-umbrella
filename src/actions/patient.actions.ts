"use server";
import { apiRequest } from "@/utils/service";

export const createPatient = (payload: any) =>
  apiRequest("patients", {
    method: "POST",
    body: payload,
  });

export const createAppointment = (payload: any) =>
  apiRequest("patients/create-appointment", {
    method: "POST",
    body: payload,
  });


export async function getActivityLogs() {
  try {
    const data = await apiRequest("logs/user", {
      method: "GET",
    });
   return data;
  } catch (error) {
    console.error("Invite error:", error);
  }
}

export async function getAppointments() {
  try {
    const data = await apiRequest("patients/appointments", {
      method: "GET",
    });
   return data;
  } catch (error) {
    console.error("Invite error:", error);
  }
}

export async function getPatients() {
  try {
    const data = await apiRequest("patients", {
      method: "GET",
    });
   return data;
  } catch (error) {
    console.error("Invite error:", error);
  }
}



export async function deleteInvitedUser(id: string) {
  try {
    const data = await apiRequest(`soa/remove-device/${id}`, {
      method: "DELETE",
    });

    return data;
  } catch (error) {
    console.error("Delete error:", error);
  }
}
