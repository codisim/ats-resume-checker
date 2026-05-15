import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import UserProfile from "@/lib/models/UserProfile";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectDB();
  const users = await User.aggregate([
    { $match: { isDeleted: false } },
    {
      $lookup: {
        from: "userprofiles",
        localField: "_id",
        foreignField: "user",
        as: "profile",
      },
    },
    { $unwind: { path: "$profile", preserveNullAndEmptyArrays: true } },
  ]);

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password, roles, name, phone, gender, designation, experience, admissionNo, batch, monthlyFee } = body;

    if (!email || !password || !name || !phone) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      roles: roles || ["STUDENT"],
    });

    await UserProfile.create({
      user: user._id,
      name,
      phone,
      gender,
      designation,
      experience,
      admissionNo,
      batch,
      monthlyFee,
      status: "ACTIVE",
    });

    const createdUser = await User.aggregate([
        { $match: { _id: user._id } },
        {
          $lookup: {
            from: "userprofiles",
            localField: "_id",
            foreignField: "user",
            as: "profile",
          },
        },
        { $unwind: { path: "$profile", preserveNullAndEmptyArrays: true } },
    ]);

    return NextResponse.json(createdUser[0], { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}
