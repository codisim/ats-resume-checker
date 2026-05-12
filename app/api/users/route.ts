import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import UserProfile from "@/lib/models/UserProfile";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectDB();
  // Aggregate to join User and UserProfile
  // Since we are using references, we can't easily "include" like Prisma in one go without population
  // But UserProfile references User, not the other way around in the schema I defined?
  // Wait, in Prisma User had `profile UserProfile?`.
  // In Mongoose UserProfile has `user: ObjectId`.
  // So to get users with profiles, we should query UserProfile and populate User, or query User and do a lookup.
  // Let's query User and do a virtual populate if possible, or just manual lookup.
  // Actually, for simplicity in Mongoose, often we query the main entity.
  // Let's adjust the query to return what the frontend expects.
  // The frontend likely expects an array of users with their profiles.

  // Let's try to simulate the previous response structure: User object with Profile nested.
  // But UserProfile has the reference to User.
  // So we can find all UserProfiles and populate 'user'.
  
  const profiles = await UserProfile.find().populate("user");
  // Transform to match previous structure if needed, or just return profiles which contain user info.
  // Previous structure: User { ..., profile: { ... } }
  // Current structure from above: UserProfile { ..., user: { ... } }
  
  // To match exactly:
  const users = await User.aggregate([
    { $match: { isDeleted: false } },
    {
      $lookup: {
        from: "userprofiles", // collection name is lowercase plural of model name usually
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

    // Basic validation
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

    // Fetch complete user with profile to return
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
