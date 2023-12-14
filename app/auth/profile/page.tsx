import Link from "next/link";
import Image from "next/image";
import { getUniversityDetails } from "@/utils/university";


export default async function Profile() {
  let acc = await getUniversityDetails();
  return (
    <div className="flex flex-col h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
      <Link href="/auth/profile/edit">
        <button className="fixed bg-secondary text-third hover:bg-hover_secondary top-12 right-16 h-10 w-20 rounded-lg m-2">
          Edit
        </button>
      </Link>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="font-bold leading-7 text-3xl  text-gray-900">
            Organization Information
          </h3>
          
          <Image
          className="my-10 h-[200px] w-[200px] text-center bg-slate-300 rounded-[50%] overflow-hidden border-2 shadow-lg"
            alt="Logo"
            src={`/U-${acc?.id}-logo.jpg`}
            width={200}
            height={200}
          />
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {acc?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Website
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <a
                  href={"https://" + String(acc?.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {acc?.website}
                </a>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {acc?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 overflow-y-scroll h-44">
                {acc?.about}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
