import { NextResponse } from "next/server";
import { authDetails } from "../../(helpers)/auth";
import prisma from "@/prisma/PrismaClient";

interface StudentDriveRequest {
  selected_resume: string;
  selected_position: string;
  drive_id: number;
}
export async function POST(r: Request) {
  try {
    const _user = authDetails(r);
    const body: StudentDriveRequest = await r.json();
    const studentDrive = await prisma.studentDrive.create({
      data: {
        student_id: _user.id,
        selected_position: body.selected_position,
        selected_resume: body.selected_resume,
        drive_id: body.drive_id,
      },
    });
    return NextResponse.json({ message: "Registered Successfully!" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
