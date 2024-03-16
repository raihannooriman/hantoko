import { retrieveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await retrieveData("users");
    res
      .status(200)
      .json({ status: true, statusCode: 200, message: "success", data: users });
  }
}
