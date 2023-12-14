import { NextResponse } from "next/server";
import { sendMail } from "../(helpers)/mailer";
import * as rstr from "randomstring";
import prisma from "@/prisma/PrismaClient";
import * as bcr from "bcrypt";
import { PasswordUpdateRequest } from "@/types";
const sendOtpMail = async (email: string) => {
  const otp = rstr.generate(6);

  let mailStat = await sendMail(
    email,
    "Email Verification",
    `OTP for ${process.env.NEXT_PUBLIC_APP_NAME} is ${otp}`
  );
  if (mailStat === "success") {
    return NextResponse.json({ otp: otp, email: email });
  } else {
    return NextResponse.json(
      { message: "Something went wrong with SMTP" },
      { status: 500 }
    );
  }
};

export async function POST(r: Request) {
  try {
    const data: { email: string } = await r.json();
    const { searchParams } = new URL(r.url);

    if (!data.email || !data.email.endsWith("@gmail.com")) {
      return NextResponse.json({ message: "Missing Email" });
    }

    if (searchParams.get("forgot") == "true") {
      if (searchParams.get("user") == "student") {
        let existingStudent = await prisma.student.findFirst({
          where: { university_email: data.email },
        });
        if (!existingStudent) {
          return NextResponse.json(
            { message: "Account doesn't exist!" },
            { status: 409 }
          );
        }
      } else {
        let existingUni = await prisma.university.findFirst({
          where: { email: data.email },
        });
        if (!existingUni) {
          return NextResponse.json(
            { message: "Account doesn't exist" },
            { status: 409 }
          );
        }
      }
    }

    return await sendOtpMail(data.email);
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}



export async function PATCH(r: Request) {
  try {
    const data: PasswordUpdateRequest = await r.json();
    let hash = await bcr.hash(data.password, Number(process.env.BCR_SALTS));
    if (data.user == "STUDENT") {
      let _update = await prisma.student.update({
        where: { university_email: data.university_email },
        data: { password: hash },
      });
    } else {
      let _update = await prisma.university.update({
        where: { email: data.email },
        data: { password: hash },
      });
    }
    return NextResponse.json({ message: "Password Changed!" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
