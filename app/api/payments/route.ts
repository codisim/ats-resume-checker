import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Payment from "@/lib/models/Payment";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { profileId, month, amount } = body;

  const payment = await Payment.create({
    profile: profileId,
    month,
    amount,
    status: "UNPAID",
  });

  return NextResponse.json(payment, { status: 201 });
}

export async function GET() {
  await connectDB();
  const payments = await Payment.find().populate("profile", "name");

  return NextResponse.json(payments);
}
