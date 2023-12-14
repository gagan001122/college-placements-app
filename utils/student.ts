import prisma from "@/prisma/PrismaClient";
import { Student } from "@prisma/client";

export const getAllStudentDetails = (async () => {
  let details = await prisma.student.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      uid: true,
      university_email: true,
      created_at: true,
      _count: {
        select: {
          drives: true,
        },
      },
    },
  });
  return details;
});

export const getStudentDetailsById = (async (id: number) => {
  let student: Student | null = await prisma.student.findFirst({
    where: { id: id },
  });
  return student;
});

export const getDriveParticipants = (async (driveId: number) => {
  let data = await prisma.placementDrive.findFirst({
    where: { id: driveId },
    select: {
      participants: {
        select: {
          student: {
            include : {
              _count : {
                select : {drives : true}
              }
            }
          },
        },
      },
    },
  });
  return data;
});
