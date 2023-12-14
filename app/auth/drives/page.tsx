import { getAllPlacementDrives } from "@/utils/placement";
import Link from "next/link";
import Image from "next/image";
import { formatDateToString } from "@/app/api/(helpers)/parsers";

interface DriveProps {
  drive: {
    id: number;
    drive_name: string;
    company_name: string;
    created_at: Date;
  } & {
    _count: {
      participants: number;
    };
  };
}

const DriveTab = ({ drive }: DriveProps) => {
  return (
    <Link
      href={`/auth/drives/${drive.id}`}
      className="hover:shadow-lg hover:bg-hover_secondary shadow-md bg-secondary text-white transition-all duration-300  p-3 rounded-2xl hover:rounded-lg border flex mb-5 justify-between"
    >
      <div className="flex">
        <Image
          className="mx-2 text-center bg-slate-300 rounded-[50%] overflow-hidden border shadow-lg"
          alt="Logo"
          src={`/D-${drive?.id}-logo.jpg`}
          width={50}
          height={50}
        />
        <div>
          <div className="text-lg font-bold ">{drive.company_name}</div>
          <div className="text-sm font-semibold ">{drive.drive_name}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="font-sm font-semibold ">
          {formatDateToString(drive.created_at)}
        </div>
        <div className="font-bold ">
          {drive._count?.participants || 0} Students
        </div>
      </div>
    </Link>
  );
};

export default async function Drives() {
  let drives = await getAllPlacementDrives();
  if (drives.length == 0) {
    return (
      <div className="flex flex-col m-10 items-center h-screen bg-third p-5 rounded-lg shadow-xl justify-center text-lg font-light">
        No Placement Drive Records Found!
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
      <div className="font-bold leading-7 text-3xl  text-gray-900">
        All Drives
      </div>
      <div className="w-1/2 p-12">
        {drives.map((drive) => (
          <div key={drive.id}>
            <DriveTab drive={drive} />
          </div>
        ))}
      </div>
    </div>
  );
}
