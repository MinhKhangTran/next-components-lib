import { readComponents } from "@/utils/Fauna";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);
  try {
    const components = await readComponents();
    res.status(200).json(components);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "something went wrong 🥲" });
  }
}
