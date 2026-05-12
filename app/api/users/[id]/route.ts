import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import UserProfile from "@/lib/models/UserProfile";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  
  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const user = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
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

  if (!user || user.length === 0) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user[0]);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const { role, designation, experience, name, phone, gender, admissionNo, batch, monthlyFee } = body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  try {
    const updateData: any = {};
    if (role) {
      updateData.$push = { roles: role };
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const profileUpdateData: any = {
      designation,
      experience,
      name,
      phone,
      gender,
      admissionNo,
      batch,
      monthlyFee,
    };

    // Remove undefined fields
    Object.keys(profileUpdateData).forEach(key => profileUpdateData[key] === undefined && delete profileUpdateData[key]);

    await UserProfile.findOneAndUpdate(
      { user: user._id },
      { $set: profileUpdateData },
      { new: true }
    );

    // Fetch updated user with profile
    const updatedUser = await User.aggregate([
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

    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}
