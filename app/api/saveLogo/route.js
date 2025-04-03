import { connectToDatabase } from "@/lib/mongodb";
import Logo from "@/lib/models/logo";

export async function POST(req) {
  const { userId, logoUrl } = await req.json();
  if (!userId || !logoUrl)
    return Response.json({ error: "Missing data" }, { status: 400 });

  await connectToDatabase();

  let userLogos = await Logo.findOne({ userId });
  if (userLogos) userLogos.logos.push(logoUrl);
  else userLogos = new Logo({ userId, logos: [logoUrl] });

  await userLogos.save();
  return Response.json({ success: true });
}
