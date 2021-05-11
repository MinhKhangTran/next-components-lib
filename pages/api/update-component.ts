import { updateComponent, readComponentById } from "@/utils/Fauna";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //get user from session
  const session = getSession(req, res);
  const userId = session?.user.sub;

  if (req.method !== "PUT")
    return res.status(405).json({ msg: "Method is not allowed" });

  //Checking if component is existing and user is auth
  const { id, code, description, name } = req.body;
  const existingComponent = await readComponentById(id);
  if (!existingComponent || existingComponent.data.userId !== userId) {
    return res.status(404).json({ msg: "Componente nicht gefunden" });
  }
  try {
    const updated = await updateComponent(id, code, description, name, userId);
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong 🥲" });
  }
});
