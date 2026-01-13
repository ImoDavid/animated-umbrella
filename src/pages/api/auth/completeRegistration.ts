import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;

    const { data } = await axios.post(
      `${process.env.API_AUTH_URL}auth/complete-soa-registration`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const token = data.data.token;

    res.setHeader(
      "Set-Cookie",
      serialize(process.env.SESSION_KEY || "token", token, {
        httpOnly: false, // or true if only server should access
        secure: process.env.NODE_ENV !== "development",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      })
    );

    res.status(200).json({ success: true, user: data.data.user });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error?.response?.data?.message || error.message || "Login failed",
    });
  }
}
