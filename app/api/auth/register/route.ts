import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import UserProfile from "@/lib/models/UserProfile";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password, name, phone } = body;

    if (!email || !password || !name || !phone) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      roles: ["STUDENT"],
    });

    await UserProfile.create({
      user: user._id,
      name,
      phone,
      status: "ACTIVE",
      admissionDate: new Date(),
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "User registration failed" },
      { status: 500 }
    );
  }
}
