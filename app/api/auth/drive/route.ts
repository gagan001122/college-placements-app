import prisma from "@/prisma/PrismaClient";
import { DrivePatchRequest, PlacementDriveRequest } from "@/types";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../[...nextauth]/route";
import { csvToArray, formDataToJSON } from "../../(helpers)/parsers";
import { saveFile } from "../../(helpers)/upload";

function validate(body: PlacementDriveRequest): [boolean, string] {
  if (!body.company_name) return [false, "company name"];
  if (!body.company_about) return [false, "about company"];
  if (!body.company_website) return [false, "company website"];
  if (!body.drive_name) return [false, "name"];
  if (!body.batch_required) return [false, "batch"];
  if (!body.bond) return [false, "bond"];
  if (!body.closes_at) return [false, "closing time"];
  if (!body.date_of_drive) return [false, "date of drive"];
  if (!body.current_cgpa_cutoff) return [false, "current cgpa cutoff"];
  if (!body.matric_result_cutoff) return [false, "matric cgpa cutoff"];
  if (!body.hsc_result_cutoff) return [false, "hsc cgpa cutoff"];
  if (body.allowed_backlogs === undefined)
    return [false, "current cgpa cutoff"];
  if (!body.job_location) return [false, "job location"];
  if (!body.job_profile) return [false, "job profile"];
  if (!body.pay_package) return [false, "pay package"];
  if (!body.placement_process) return [false, "placement process"];
  if (!body.positions) return [false, "positions"];
  if (!body.skills_required) return [false, "skills required"];
  if (!body.stream_required) return [false, "stream required"];
  if (!body.type_of_drive) return [false, "type of drive"];
  return [true, "success"];
}

const _format = (
  _data: PlacementDriveRequest & {
    company_logo?: any;
    job_description?: any;
  }
) => {
  delete _data.company_logo;
  delete _data.job_description;

  _data.positions = csvToArray(String(_data.positions));
  _data.skills_required = csvToArray(String(_data.skills_required));
  _data.date_of_drive = new Date(_data.date_of_drive);
  _data.closes_at = new Date(_data.closes_at);
  _data.batch_required = Number(_data.batch_required);
  _data.allowed_backlogs = Number(_data.allowed_backlogs);
  _data.hsc_result_cutoff = Number(_data.hsc_result_cutoff);
  _data.current_cgpa_cutoff = Number(_data.current_cgpa_cutoff);
  _data.matric_result_cutoff = Number(_data.matric_result_cutoff);
};

interface FileUpdate {
  has_logo_attachment?: boolean;
  has_jd_attachment?: boolean;
}
export async function POST(r: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
      throw new Error("Invalid Session!");
    }
    const fdata = await r.formData();
    let companyLogo = fdata.get("company_logo") as File;
    let jd = fdata.get("job_description") as File;
    const _data: PlacementDriveRequest & {
      company_logo?: any;
      job_description?: any;
    } = formDataToJSON(fdata);

    _format(_data);
    const validation = validate(_data);
    if (!validation[0]) {
      return NextResponse.json(
        { message: `Missing/Invalid ${validation[1]}` },
        { status: 400 }
      );
    }
    let drive = await prisma.placementDrive.create({ data: _data });
    let fileUpdateConfig: FileUpdate = {};
    if (companyLogo != null) {
      await saveFile(companyLogo, `D-${drive.id}-logo.jpg`);
      fileUpdateConfig.has_logo_attachment = true;
    }

    if (jd != null) {
      await saveFile(jd, `D-${drive.id}-jd.pdf`);
      fileUpdateConfig.has_jd_attachment = true;
    }
    await prisma.placementDrive.update({
      where: { id: drive.id },
      data: fileUpdateConfig,
    });
    return NextResponse.json({ message: "Drive created successfully!" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PATCH(r: Request) {
  try {
    const _data: DrivePatchRequest = await r.json();
    let update = await prisma.placementDrive.update({
      where: { id: _data.id },
      data: _data,
    });
    return NextResponse.json({ message: "Drive Updated Successfully" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function GET(r: Request) {
  try {
    const { searchParams } = new URL(r.url);
    let id = searchParams.get("id");
    if (Number(id) || Number(id) == 0) {
      //case for a selective drive
      let drive = await prisma.placementDrive.findFirst({
        where: { id: Number(id) },
      });
      return NextResponse.json({ drive: drive });
    } else if (id == "all") {
      //drive history
      let drives = await prisma.placementDrive.findMany({
        include: { _count: { select: { participants: true } } },
      });
      return NextResponse.json({ drives: drives });
    } else {
      //latest drive
      let drives = await prisma.placementDrive.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 1,
      });
      return NextResponse.json({ drive: drives[0] });
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
