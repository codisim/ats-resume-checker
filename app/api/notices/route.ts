import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Notice from "@/lib/models/Notice";
import User from "@/lib/models/User";

export async function GET() {
  await connectDB();
  const notices = await Notice.find()
    .populate("createdBy", "email roles")
    .sort({ createdAt: -1 });

  return NextResponse.json(notices);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { title, description, userId } = body;

  const user = await User.findById(userId);

  if (!user || !user.roles.some((r: string) => r === "ADMIN" || r === "TEACHER")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const notice = await Notice.create({
    title,
    description,
    createdBy: userId,
  });

  return NextResponse.json(notice, { status: 201 });
}
