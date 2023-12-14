import Link from "next/link";
import Image from "next/image";
import { formatDateToString } from "@/app/api/(helpers)/parsers";
import { getAllStudentDetails, getDriveParticipants } from "@/utils/student";

interface StudentProps {
  student: {
    id: number;
    first_name: string;
    last_name: string;
    uid: string;
    created_at: Date;
    university_email: string;
  } & {
    _count: {
      drives: number;
    };
  };
}

const StudentTab = ({ student }: StudentProps) => {
  return (
    <Link
      href={`/auth/students/${student.id}`}
      className="hover:shadow-lg hover:bg-hover_secondary shadow-md bg-secondary text-white transition-all duration-300  p-3 rounded-2xl hover:rounded-lg border flex mb-5 justify-between"
    >
      <div className="flex">
        <Image
          className="mx-2 text-center bg-slate-300 rounded-[200%] overflow-hidden border shadow-lg"
          alt="Logo"
          src={`/S-${student?.id}-pfp.jpg`}
          width={50}
          height={50}
        />
        <div>
          <div className="text-lg font-bold ">{`${student.first_name} ${student.last_name}`}</div>
          <div className="text-sm font-semibold ">
            {student.university_email}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="font-sm font-semibold ">
          {formatDateToString(student.created_at)}
        </div>
        <div className="font-bold ">
          {student._count?.drives || 0} Registrations
        </div>
      </div>
    </Link>
  );
};

export default async function Drives({ params }: any) {
  let _data = await getDriveParticipants(Number(params.id))
  let students = _data?.participants.map(pt=> pt.student) || [];
  // let students = await getAllStudentDetails();
  if (students.length == 0) {
    return (
      <div className="flex flex-col m-10 items-center h-screen bg-third p-5 rounded-lg shadow-xl justify-center text-lg font-light">
        No Student Records Found!
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
      <div className="font-bold leading-7 text-3xl  text-gray-900">
        Student Records
      </div>
      <div className="w-1/2 p-12">
        {students.map((student, idx) => (
          <div key={idx}>
            <StudentTab student={student} />
          </div>
        ))}
      </div>
    </div>
  );
}
