import prisma from "@/prisma/PrismaClient";
import { StudentLoginRequest } from "@/types";
import { Student } from "@prisma/client";
import * as bcr from "bcrypt";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const validate = (b: StudentLoginRequest): [boolean, string] => {
  var field = "";
  if (!b.password) field = "password";
  else if (!b.university_email)
    field = "email";
  if (field) {
    return [false, field];
  }
  return [true, ""];
};

export async function POST(r: Request) {
  try {
    const data: StudentLoginRequest = await r.json();
    const validation: [boolean, string] = validate(data);

    if (!validation[0]) {
      return NextResponse.json(
        { message: `Missing/Invalid ${validation[1]}` },
        { status: 400 }
      );
    }

    let existingStudent: Student | null | { password?: string } =
      await prisma.student.findFirst({
        where: { university_email: data.university_email },
      });
    if (!existingStudent) {
      return NextResponse.json(
        { message: `An Account with ${data.university_email} doesn't exist!` },
        { status: 409 }
      );
    }

    let passwordMatch: boolean = await bcr.compare(
      data.password,
      String(existingStudent.password)
    );

    if (!passwordMatch) {
      return NextResponse.json({ message: "Wrong Password" }, { status: 409 });
    }
    delete existingStudent.password;
    let token = jwt.sign(existingStudent, String(process.env.JWT_SECRET_KEY));
    return NextResponse.json({ token: token, data: existingStudent });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
