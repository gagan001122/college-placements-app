import prisma from "@/prisma/PrismaClient";
import { SignupRequest } from "@/types";
import { Role, University } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcr from 'bcrypt'
import * as jwt from 'jsonwebtoken'

function validate(body: SignupRequest & {role : Role}): [boolean, string] {
    if (!body.email || !body.email.endsWith("gmail.com")) return [false, "email"];
    if (!body.password) return [false, "password"];
    if (!body.name) return [false, "name"];
    return [true, "success"];
  }
  
  export async function POST(r: Request) {
    try {
      const body: SignupRequest & {role : Role} = await r.json();
      //validate request body
      const validation = validate(body);
      if (!validation[0]) {
        return NextResponse.json(
          { message: `Missing/Invalid ${validation[1]}` },
          { status: 400 }
        );
      }
      //check for existing account
      const acc: University | null = await prisma.university.findFirst({
        where: { email: body.email },
      });
  
      if (acc) {
        return NextResponse.json(
          { message: `An Account with this email/name already exists` },
          { status: 409 }
        );
      }
      body.password = await bcr.hash(body.password, Number(process.env.BCR_SALTS));
      body.role = Role.UNIVERSITY
      let _acc: University | { password?: any } = await prisma.university.create({
        data: body,
      });
      delete _acc.password;
      
      return NextResponse.json({message: "Account created" }, { status: 200 });
    } catch (e: any) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }
  