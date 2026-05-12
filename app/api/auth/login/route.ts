import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

// ✅ Ensure JWT secret exists
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    // 1️⃣ Connect DB
    await connectDB();

    // 2️⃣ Parse body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 3️⃣ Find user
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4️⃣ Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 5️⃣ Convert roles to plain JS array (🔥 FIX)
    const roles = Array.isArray(user.roles)
      ? user.roles.map((role: any) => role.toString())
      : [];

    // 6️⃣ Create JWT
    const secret = new TextEncoder().encode(JWT_SECRET);

    const token = await new SignJWT({
      userId: user._id.toString(),
      email: user.email,
      roles,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    // 7️⃣ Set cookie
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    // 8️⃣ Response
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          email: user.email,
          roles,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
