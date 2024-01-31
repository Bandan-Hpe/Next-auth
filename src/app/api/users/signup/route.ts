import { Connect } from "@/dbConfig/database";
import User from "@/models/Usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;
    console.log(reqBody);

    // check if username already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "username already exists" },
        { status: 400 }
      );
    }
    // check password
    const salt = await bcrypt.gensalt(10);
    const hashpasword = await bcrypt.hash(password, salt);

    // create a new user
    const Newuser = new User({ username, email, password: hashpasword });

    const saveUser = await Newuser.save();
    console.log(saveUser);

    return NextResponse.json({
      message: "user saved successfully",
      success: true,
      saveUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

Connect();
