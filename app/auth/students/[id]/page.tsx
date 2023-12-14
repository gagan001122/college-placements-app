import { getStudentDetailsById } from "@/utils/student";
import Image from "next/image";
import { FaPaperclip } from "react-icons/fa";

interface PageProps {
  params: {
    id: number;
  };
}

interface AttachmentProps {
  fileName: string;
  filePath: string;
}

const Attachment = ({ fileName, filePath }: AttachmentProps) => {
  return (
    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
      <div className="flex w-0 flex-1 items-center">
        <FaPaperclip
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        <div className="ml-4 flex min-w-0 flex-1 gap-2">
          <span className="truncate font-medium">{fileName}</span>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        <a
          href={filePath}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Download
        </a>
      </div>
    </li>
  );
};

const getAttachments = (student: any): AttachmentProps[] => {
  let attachments: AttachmentProps[] = [];
  if (student?.has_resume1_attachment) {
    attachments.push({
      fileName: "resume-1",
      filePath: `/S-${student.id}-resume1.pdf`,
    });
  }
  if (student?.has_resume2_attachment) {
    attachments.push({
      fileName: "resume-2",
      filePath: `/S-${student.id}-resume2.pdf`,
    });
  }
  if (student?.has_resume2_attachment) {
    attachments.push({
      fileName: "resume-3",
      filePath: `/S-${student.id}-resume3.pdf`,
    });
  }
  if (student?.has_matric_attachment) {
    attachments.push({
      fileName: "matric Result",
      filePath: `/S-${student.id}-matric_result.jpg`,
    });
  }
  if (student?.has_hsc_attachment) {
    attachments.push({
      fileName: "12th Result",
      filePath: `/S-${student.id}-hsc_result.jpg`,
    });
  }
  return attachments;
};
async function StudentPage({ params }: PageProps) {
  let student = await getStudentDetailsById(Number(params.id));
  let attachments: AttachmentProps[] = getAttachments(student);
  if (!student) {
    return (
      <div className="flex flex-col m-10 items-center h-screen bg-third p-5 rounded-lg shadow-xl justify-center text-lg font-light">
        No Student Record Found!
      </div>
    );
  }
  return (
    <div className="flex flex-col m-10 h-screen bg-third p-5 rounded-lg shadow-xl  text-lg font-light">
      <h3 className="font-bold leading-7 text-3xl  text-gray-900">
        Student Information
      </h3>

      <div>
        <div className="px-4 sm:px-0">
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <Image
          className="my-10 h-[200px] w-[200px] text-center bg-slate-300 rounded-[50%] overflow-hidden border-2 shadow-lg"
            alt="Logo"
            src={`/S-${student?.id}-pfp.jpg`}
            width={200}
            height={200}
          />
        <div className="mt-6 border-t border-gray-100">
          
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${student.first_name} ${student.last_name}`}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Batch
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${student.course}-${student.batch}`}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.personal_email || student.university_email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Current CGPA
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.current_cgpa || "NA"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                UID
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.uid}
              </dd>
            </div>
            {attachments.length > 0 ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Attachments
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {attachments.map((attachment, idx) => {
                      return (
                        <Attachment
                          fileName={attachment.fileName}
                          filePath={attachment.filePath}
                          key={idx}
                        />
                      );
                    })}
                  </ul>
                </dd>
              </div>
            ) : (
              <></>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
