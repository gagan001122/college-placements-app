import React from "react";
import { SiProcessingfoundation, SiOnlyoffice } from "react-icons/si";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiArchiveRegister } from "react-icons/gi";
import prisma from "@/prisma/PrismaClient";

interface props {
  title: string;
  logo: any;
  monthlyStat: number;
  color: string;
}

function DataTab({ title, logo, monthlyStat, color }: props) {
  return (
    <div
      className={`border  rounded-lg w-1/4 p-3 mx-2 h-32 flex flex-col justify-between shadow-md ${color}`}
    >
      <div className="flex justify-between items-center m-2">
        <div>{title}</div>
        <div>{logo}</div>
      </div>
      <div className="m-2">{monthlyStat}</div>
    </div>
  );
}

const getTabDetails = async () => {
  let drives = await prisma.placementDrive.count();
  let registrations = await prisma.studentDrive.count();
  let openDrives = await prisma.placementDrive.count({
    where: {
      closes_at: {
        gt: new Date(),
      },
    },
  });
  let ongoingDrives = await prisma.placementDrive.count({
    where: {
      date_of_drive: {
        gte: new Date(),
      },
    },
  });
  return [
    {
      title: "Drives",
      logo: <SiOnlyoffice />,
      monthlyStat: drives,
      color: "bg-red-400",
    },
    {
      title: "Registrations",
      logo: <GiArchiveRegister />,
      monthlyStat: registrations,
      color: "bg-green-400",
    },
    {
      title: "Open Drives",
      logo: <SiProcessingfoundation />,
      monthlyStat: openDrives ,
      color: "bg-blue-400",
    },
    {
      title: "Ongoing Drives",
      logo: <HiOutlineOfficeBuilding />,
      monthlyStat: ongoingDrives,
      color: "bg-yellow-400",
    },
  ];
};


const DataTabs = async () => {
  let TabDetails: props[] = await getTabDetails();
  return (
    <div className="flex justify-between mb-5">
      {TabDetails.map((tab, idx) => {
        return (
          <DataTab
            key={idx}
            title={tab.title}
            logo={tab.logo}
            monthlyStat={tab.monthlyStat}
            color={tab.color}
          />
        );
      })}
    </div>
  );
};

export default DataTabs;
