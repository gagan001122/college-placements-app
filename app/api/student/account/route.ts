import prisma from "@/prisma/PrismaClient";
import {
  CurrentUser,
  StudentPatchRequest,
  StudentSignupRequest,
} from "@/types";
import { Role, Student } from "@prisma/client";
import { NextResponse } from "next/server";
import { authDetails } from "../../(helpers)/auth";
import { saveFile } from "../../(helpers)/upload";
import * as bcr from "bcrypt";
import * as jwt from "jsonwebtoken";
import { formDataToJSON } from "../../(helpers)/parsers";
export async function GET(r: Request) {
  try {
    const { searchParams } = new URL(r.url);
    if (!searchParams.has("type")) {
      return NextResponse.json(
        { message: "Missing Request Type" },
        { status: 400 }
      );
    }
    if (searchParams.get("type") == "id") {
      let _id = Number(searchParams.get("id"));
      let _acc: Student | null | { password?: string } =
        await prisma.student.findFirst({ where: { id: _id } });
      delete _acc?.password;
      return NextResponse.json({ acc: _acc });
    } else {
      let _accs = await prisma.student.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          uid: true,
          password: false,
        },
      });

      return NextResponse.json({ accs: _accs });
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

interface FileUploadConfig {
  has_matric_attachment?: boolean;
  has_hsc_attachment?: boolean;
  has_pfp_attachment?: boolean;
  has_resume1_attachment?: boolean;
  has_resume2_attachment?: boolean;
  has_resume3_attachment?: boolean;
}

const handleUserFiles = async (fdata: FormData, userId: number) => {
  let fileConfig: FileUploadConfig = {};
  let resume1: File | null = fdata.get("resume_1") as File;
  let resume2: File | null = fdata.get("resume_2") as File;
  let resume3: File | null = fdata.get("resume_3") as File;
  let matricResult: File | null = fdata.get("matric_result") as File;
  let hscResult: File | null = fdata.get("hsc_result") as File;
  let pfp: File | null = fdata.get("pfp") as File;
  if (resume1) {
    await saveFile(resume1, `S-${userId}-resume1.pdf`);
    fileConfig.has_resume1_attachment = true;
  }
  if (resume2) {
    await saveFile(resume2, `S-${userId}-resume2.pdf`);
    fileConfig.has_resume2_attachment = true;
  }
  if (resume3) {
    await saveFile(resume3, `S-${userId}-resume3.pdf`);
    fileConfig.has_resume3_attachment = true;
  }
  if (matricResult) {
    await saveFile(matricResult, `S-${userId}-matric_result.jpg`);
    fileConfig.has_matric_attachment = true;
  }
  if (hscResult) {
    await saveFile(hscResult, `S-${userId}-hsc_result.jpg`);
    fileConfig.has_hsc_attachment = true;
  }
  if (pfp) {
    await saveFile(pfp, `S-${userId}-pfp.jpg`);
    fileConfig.has_pfp_attachment = true;
  }
  return fileConfig;
};
const formatData = (body: StudentPatchRequest) => {
  delete body.resume_1;
  delete body.resume_2;
  delete body.resume_3;
  delete body.matric_result;
  delete body.hsc_result;
  delete body.pfp;
  if (body.batch) body.batch = Number(body.batch);
  if (body.has_gap_year) body.has_gap_year = Boolean(body.has_gap_year);
  if (body.current_cgpa) body.current_cgpa = Number(body.current_cgpa);
  if (body.matric_result) body.matric_result = Number(body.matric_result);
  if (body.hsc_result) body.hsc_result = Number(body.hsc_result);
  if (body.number_of_backlogs)
    body.number_of_backlogs = Number(body.number_of_backlogs);
};
export async function PATCH(r: Request) {
  try {
    let user: CurrentUser = authDetails(r);
    const fdata = await r.formData();
    const fileConfig = await handleUserFiles(fdata, user.id);
    const body: StudentPatchRequest = formDataToJSON(fdata);
    formatData(body);
    await prisma.student.update({where : {id : user.id}, data : {...body, ...fileConfig}})
    return NextResponse.json({message : "Data Updated!"});
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

const validate = (b: StudentSignupRequest): [boolean, string] => {
  var field = "";
  if (!b.first_name) field = "fist name";
  else if (!b.last_name) field = "last name";
  else if (!b.password) field = "password";
  else if (!b.uid) field = "uid";
  else if (!b.university_email) field = "email";
  if (field) {
    return [false, field];
  }
  return [true, ""];
};

export async function POST(r: Request) {
  try {
    var data: StudentSignupRequest & { role: Role } = await r.json();

    const validation: [boolean, string] = validate(data);

    if (!validation[0]) {
      return NextResponse.json(
        { message: `Missing/Invalid ${validation[1]}` },
        { status: 400 }
      );
    }

    let existingStudent = await prisma.student.findFirst({
      where: {
        OR: [
          {
            university_email: data.university_email,
          },
          {
            uid: data.uid,
          },
        ],
      },
    });

    if (existingStudent) {
      return NextResponse.json(
        {
          message: `An Account with ${data.university_email} already exists`,
        },
        { status: 409 }
      );
    }

    data.password = await bcr.hash(
      data.password,
      Number(process.env.BCR_SALTS)
    );
    data.role = Role.STUDENT;

    let student: Student | null | { password?: string } =
      await prisma.student.create({ data: data });

    delete student.password;

    let token = jwt.sign(student, String(process.env.JWT_SECRET_KEY));
    return NextResponse.json({ token: token, data: student });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
