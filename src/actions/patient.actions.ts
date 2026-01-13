"use server";
import { apiRequest } from "@/utils/service";

export const createPatient = (payload: any) =>
  apiRequest("patients", {
    method: "POST",
    body: payload,
  });




export async function getInvitedUsers() {
  try {
    const data = await apiRequest("soa/get-invitees", {
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
