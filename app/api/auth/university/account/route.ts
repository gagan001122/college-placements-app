import prisma from "@/prisma/PrismaClient";
import { AccountPatchRequest } from "@/types";
import { University } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { saveFile } from "@/app/api/(helpers)/upload";
import { formDataToJSON } from "@/app/api/(helpers)/parsers";

export async function GET(r: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
      throw new Error("Invalid Session");
    }
    let uni: University | null = await prisma.university.findFirst({
      where: { email: String(session.user.email) },
    });
    if (!uni) {
      return NextResponse.json(
        { message: "Invalid Account Token" },
        { status: 409 }
      );
    }
    return NextResponse.json({ acc: uni });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PATCH(r: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user || !session.user.email) {
      throw new Error("Invalid Session!");
    }
    const uni = await prisma.university.findFirst({
      where: { email: session.user.email },
    });
    if (!uni) {
      throw new Error("Invalid Session!");
    }
    const fdata = await r.formData();
    const uniLogo = fdata.get("logo") as unknown as File;
    if (uniLogo) {
      saveFile(uniLogo, `U-${uni?.id}-logo.jpg`);
    }

    const body: AccountPatchRequest & { logo?: any } & {
      has_logo_attachment?: boolean;
    } = await formDataToJSON(fdata);
    delete body.logo;
    body.id = uni?.id;
    body.has_logo_attachment = uniLogo != null;
    await prisma.university.update({ where: { id: uni.id }, data: body });

    return NextResponse.json({ message: "success!" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
