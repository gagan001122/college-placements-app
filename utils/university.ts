import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/PrismaClient";
import { getServerSession } from "next-auth";

export const getUniversityDetails = (async () => {
  const data = await getServerSession(authConfig);
  let acc = await prisma.university.findFirst({
    where: { email: String(data?.user?.email) },
  });
  return acc;
});