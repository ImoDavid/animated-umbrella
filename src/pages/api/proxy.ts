import type { NextApiRequest, NextApiResponse } from "next";



//const BASE_URL = process.env.BOUQUET_URL
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, headers, query } = req;
  const { endpoint } = query;

  if (!endpoint || typeof endpoint !== "string") {
    return res.status(400).json({ message: "Missing or invalid endpoint" });
  }

  try {
   // console.log(endpoint)
   const BASE_URL = process.env.API_URL;

   // console.log(BASE_URL, endpoint, "plans")

    const apiRes = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": headers["content-type"] || "application/json",
        Accept: "application/json",
        ...(headers.authorization && {
          Authorization: headers.authorization,
        }),
      },
      body: ["GET", "HEAD"].includes(method || "")
        ? undefined
        : JSON.stringify(body),
    });

    const contentType = apiRes.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await apiRes.json()
      : await apiRes.text();

    return res.status(apiRes.status).send(data);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
}
