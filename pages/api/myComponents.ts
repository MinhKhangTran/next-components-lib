import { readComponentsByUser } from "@/utils/Fauna";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  const userId = session?.user.sub;

  if (req.method !== "GET") {
    return res.status(405).json({ msg: "Nur GET Methoden erlaubt" });
  }
  try {
    const components = await readComponentsByUser(userId);
    return res.status(200).json(components);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Irgendwas lief schief 🥲" });
  }
});
