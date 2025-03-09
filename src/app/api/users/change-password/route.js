import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { compare, hash } from "bcryptjs";

export async function POST(request) {
  try {
    const { userId, currentPassword, newPassword } = await request.json();
    const { db } = await connectToDatabase();

    // Find the user
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isValid = await compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password and update
    const hashedPassword = await hash(newPassword, 12);
    await db.collection("users").updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
} 