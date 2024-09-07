import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Allow access to the dashboard if the user is authenticated.
  // You can add additional logic here to restrict access to specific routes
  // based on user roles, permissions, or other criteria.

  return res.status(200).json({ message: "Authenticated" });
}