import { createComponent } from "@/utils/Fauna";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  const userId = session?.user.sub;
  const { code, description, name } = req.body;
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Nur POST Methoden erlaubt" });
  }
  try {
    const createdComponent = await createComponent(
      code,
      description,
      name,
      userId
    );
    res.status(200).json(createdComponent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Irgendwas lief schief 🥲" });
  }
});
