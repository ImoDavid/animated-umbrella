"use server";
import { isSuccess } from "@/utils";
import { apiRequest } from "@/utils/service";

export async function getPlans(region: string) {
  try {
    const data = await apiRequest(
      `bouquets?regionCode=${encodeURIComponent(region)}`,
      {
        method: "GET",
      }
    );

    return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("error:", error);
  }
}
export async function getSinglePlan(id: string) {
  try {
    const data = await apiRequest(
      `bouquets/${id}`,
      {
        method: "GET",
      }
    );

    return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("error:", error);
  }
}

export async function getBouquetContents(
  id: string,
  type: string,
  query?: string
) {
  try {
    const endpoint = query
      ? `bouquet/${id}/content/${type}?name=${encodeURIComponent(query)}`
      : `bouquet/${id}/content/${type}`;

    const data = await apiRequest(endpoint, {
      method: "GET",
    });

    return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("error:", error);
  }
}


export async function subscribe(payload: {
  planId: string;
}) {
  try {
    const data = await apiRequest("subscribe", {
      method: "POST",
      body: payload,
      protect: true,
    });

      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("validation error:", error);
  }
}



