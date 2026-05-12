import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/lib/models/Review";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { profileId, comment } = body;

  const review = await Review.create({
    profile: profileId,
    comment,
  });

  return NextResponse.json(review, { status: 201 });
}

export async function GET() {
  await connectDB();
  const reviews = await Review.find()
    .populate("profile", "name profilePhoto")
    .sort({ createdAt: -1 });

  return NextResponse.json(reviews);
}
