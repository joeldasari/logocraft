import { connectToDatabase } from "@/lib/mongodb";
import Logo from "@/lib/models/logo";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId)
    return Response.json({ error: "Missing userId" }, { status: 400 });

  await connectToDatabase();
  const userLogos = await Logo.findOne({ userId });

  return Response.json({ logos: userLogos ? userLogos.logos : [] });
}
