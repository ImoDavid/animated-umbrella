// utils/apiClient.ts
import { parseCookies } from "nookies";

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
  body?: any;
  protect?: boolean;
}

export async function apiRequest<T = any>(
  endpoint: string,
  {
    method = "GET",
    headers = {},
    query = {},
    body,
    protect = true,
  }: ApiRequestOptions = {}
): Promise<T> {
  const queryString = new URLSearchParams(
    Object.entries(query).reduce((acc, [key, val]) => {
      acc[key] = String(val);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const url = `/api/proxy?endpoint=${encodeURIComponent(endpoint)}${
    queryString ? `&${queryString}` : ""
  }`;

  const cookies = parseCookies();

  const possibleTokenKeys = ["_currentSession", "token"];
  const token =
    possibleTokenKeys.map((key) => cookies[key]).find(Boolean) || "";

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  if (protect && token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: ["GET", "HEAD"].includes(method)
      ? undefined
      : JSON.stringify(body),
  });

  const contentType = res.headers.get("content-type");
  const responseData =
    contentType?.includes("application/json")
      ? await res.json()
      : await res.text();

 
  if (!res.ok) {
    const message =
      (responseData as any)?.message ||
      (typeof responseData === "string"
        ? responseData
        : `Request failed with status ${res.status}`);

    throw new Error(message);
  }

  return responseData as T;
}
