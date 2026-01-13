import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // Clear the cookie by setting it with an expired date
  res.setHeader("Set-Cookie", serialize(process.env.SESSION_KEY || "token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Expire the cookie immediately
  }));

  res.status(200).json({ success: true, message: "Logged out successfully" });
}
