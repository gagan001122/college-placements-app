import { formatDateToString } from "@/app/api/(helpers)/parsers";
import { getPlacementDrive } from "@/utils/placement";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface InfoProps {
  name: string;
  description: string;
}


export default async function Drive({ params }: any) {
  let drive = await getPlacementDrive(Number(params.id));
  if (!drive) {
    redirect("");
  }
  const details: { name: string; description: string }[] = [
    { name: "Drive Name", description: drive.drive_name },
    {
      name: "Batch",
      description: String(drive.batch_required),
    },
    {
      name: "Date of Drive",
      description: formatDateToString(drive.date_of_drive),
    },
    { name: "Form Closes", description: formatDateToString(drive.closes_at) },
    { name: "Job Location", description: drive.job_location },
    {
      name: "Package",
      description: drive.pay_package,
    },
    {
      name: "Job Profile",
      description: drive.job_profile,
    },
    {
      name: "Placement Process",
      description: drive.placement_process,
    },
    { name: "Bond", description: drive.bond || "NA" },
    { name: "Backlogs Allowed", description: String(drive.allowed_backlogs) },
    { name: "Website", description: drive.company_website || "NA" },
  ];

  return (
    <div className="flex flex-col h-auto m-10 bg-third p-5 rounded-lg shadow-xl">
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="font-bold leading-7 text-3xl  text-gray-900">
            Drive Details
          </h3>
          <div className="flex flex-col items-center">
            <Image
              className="my-10 h-[200px] w-[200px] text-center bg-slate-300 rounded-[50%] overflow-hidden border-2 shadow-lg"
              alt="Logo"
              src={`/D-${params.id}-logo.jpg`}
              width={200}
              height={200}
            />
            <Link
              href={`/auth/drives/${drive.id}/participants`}
              className="bg-secondary p-2 rounded-md text-white flex flex-col items-center"
            >
              <div className="font-bold text-lg">Participants</div>
              <div>{drive._count.participants}</div>
            </Link>
          </div>
        </div>
        <div className="mt-6 ">
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-y-4 lg:gap-x-4">
            {details.map((ele, idx) => (
              <div key={idx} className="border-t border-gray-200 pt-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {ele.name}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 overflow-auto h-44">
                  {ele.name == "Website" ? (
                    <a
                      href={"https://" + String(ele.description)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {ele.description}
                    </a>
                  ) : (
                    ele.description
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
