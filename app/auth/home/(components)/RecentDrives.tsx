import { getRecentPlacementDrives } from "@/utils/placement";
import React from "react";
import Image from "next/image";

interface props {
  driveName: string;
  companyName: string;
  participants: Number;
  id: Number;
}
const DriveTab = ({ id, driveName, companyName, participants }: props) => {
  return (
    <div className="flex justify-between items-start mb-2">
      <div className="flex ">
        <Image
          className="mx-2 text-center bg-slate-300 rounded-[50%] overflow-hidden border shadow-lg"
          alt="Logo"
          src={`/D-${id}-logo.jpg`}
          width={50}
          height={50}
        />
        <div>
          <div className="font-semibold">{companyName}</div>
          <div className="text-slate-400 text-sm">{driveName}</div>
        </div>
      </div>

      <div className="text-sm text-slate-400">
        {`${participants} Participants`}
      </div>
    </div>
  );
};

async function RecentDrives() {
  const recentDrives = await getRecentPlacementDrives();
  return (
    <div className="border p-2 m-2 rounded-md w-1/2 h-[50vh] shadow-md">
      <div className="ml-2">
        <div className="text-xl mb-2 font-bold">Recent Drives</div>
        {recentDrives.map((drive, idx) => {
          return (
            <DriveTab
              key={idx}
              id={drive.id}
              driveName={drive.drive_name}
              companyName={drive.company_name}
              participants={drive._count.participants}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RecentDrives;
