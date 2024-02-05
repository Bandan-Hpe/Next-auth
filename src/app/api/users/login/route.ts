import { Connect } from "@/dbConfig/database";
import User from "@/models/Usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();

    const { email, password } = reqbody;
    console.log(reqbody);

    // check if user already exists

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "user doesnt exist" },
        { status: 400 }
      );
    }

    // check if password is matching

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "password does not match" },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    res.cookies.set("token", token, { httpOnly: true });

    return res;

    // create token
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
