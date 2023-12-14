"use client";
import { jsonToFormData } from "@/app/api/(helpers)/parsers";
import { PlacementDriveRequest } from "@/types";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CreateDrivePage() {
  const [driveData, setDriveData] = useState<PlacementDriveRequest & any>();
  const [logo, setLogo] = useState<File | null>();
  const [jd, setJD] = useState<File | null>();
  const formRef = useRef<any>();
  const createDrive = (e: FormEvent) => {
    e.preventDefault();
    let formData = jsonToFormData(driveData);
    if (jd) {
      formData.append("job_description", jd);
    }
    if (logo) {
      formData.append("company_logo", logo);
    }
    axios
      .post("/api/auth/drive", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        formRef.current.reset();
        toast.success("Drive created Successfully", { autoClose: 1000 });
      })
      .catch((e) => toast.error("Something Went Wrong", { autoClose: 1000 }));
  };
  return (
    <div className="flex flex-col h-auto m-10 bg-third p-5 rounded-lg shadow-xl">
      <div className="text-3xl font-bold">Create Drive</div>
      <form className="p-10 flex flex-col" onSubmit={createDrive} ref={formRef}>
        <div className="shadow-lg rounded-lg p-6 border-2 bg-slate-100 mb-4">
          <div className="mb-4 font-semibold text-slate-500">
            Company Details
          </div>
          <div className="flex justify-evenly">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Company Name
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Company Name"
                onChange={(e) => {
                  setDriveData({ ...driveData, company_name: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                About Company
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Company About"
                onChange={(e) => {
                  setDriveData({ ...driveData, company_about: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Company Website
              </label>
              <div className="w-64 bg-white flex rounded border">
                <div className="bg-gray-200 w-[25%] flex justify-center items-center text-gray-400">
                  https://
                </div>
                <input
                  required
                  className="shadow appearance-none w-[75%] text-gray-700 py-2 px-3 leading-tight "
                  type="text"
                  placeholder="Company Website"
                  onChange={(e) => {
                    setDriveData({
                      ...driveData,
                      company_website: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg rounded-lg p-6 border-2 bg-slate-100 mb-4">
          <div className="mb-4 font-semibold text-slate-500">Drive Details</div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Drive Name
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Drive Name"
                onChange={(e) => {
                  setDriveData({ ...driveData, drive_name: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Type of Drive
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Type"
                onChange={(e) => {
                  setDriveData({ ...driveData, type_of_drive: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Drive Start Date
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="date"
                placeholder="Date"
                onChange={(e) => {
                  setDriveData({ ...driveData, date_of_drive: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Bond
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Bond Description"
                onChange={(e) => {
                  setDriveData({ ...driveData, bond: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Placement Process
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                onChange={(e) => {
                  setDriveData({
                    ...driveData,
                    placement_process: e.target.value,
                  });
                }}
                placeholder="Brief Description"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Form Close Date
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="date"
                placeholder="Close Date"
                onChange={(e) => {
                  setDriveData({ ...driveData, closes_at: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Positions
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Positions offered"
                onChange={(e) => {
                  setDriveData({ ...driveData, positions: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Skills Required
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Good to have skills"
                onChange={(e) =>
                  setDriveData({
                    ...driveData,
                    skills_required: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Stream Required
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Stream"
                onChange={(e) =>
                  setDriveData({
                    ...driveData,
                    stream_required: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                CGPA Cutoff
              </label>
              <input
                required
                step="0.01"
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="number"
                placeholder="Current CGPA Cutoff"
                onChange={(e) =>
                  setDriveData({
                    ...driveData,
                    current_cgpa_cutoff: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Matric Cutoff
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="number"
                placeholder="10th Result in %"
                onChange={(e) =>
                  setDriveData({
                    ...driveData,
                    matric_result_cutoff: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Intermediate Cutoff
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="number"
                onChange={(e) =>
                  setDriveData({
                    ...driveData,
                    hsc_result_cutoff: e.target.value,
                  })
                }
                placeholder="12th Result in %"
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Other Eligibilty Criteria
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                onChange={(e) =>
                  setDriveData({
                    ...driveData,
                    other_eligibility_criteria: e.target.value,
                  })
                }
                placeholder="Criteria"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Allowed Backlogs
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="number"
                onChange={(e) =>
                  setDriveData({
                    ...driveData,
                    allowed_backlogs: e.target.value,
                  })
                }
                placeholder="No. of Backlogs"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Batch
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                onChange={(e) =>
                  setDriveData({ ...driveData, batch_required: e.target.value })
                }
                placeholder="Batch Required(year)"
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Job Locations
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Job Locations"
                onChange={(e) =>
                  setDriveData({ ...driveData, job_location: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Job Profile
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Job Profile"
                onChange={(e) =>
                  setDriveData({ ...driveData, job_profile: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Pay Package
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight "
                type="text"
                placeholder="Pay Package Description"
                onChange={(e) =>
                  setDriveData({ ...driveData, pay_package: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="shadow-lg rounded-lg p-6 border-2 bg-slate-100 mb-4">
          <div className="mb-4 font-semibold text-slate-500">Attachments</div>
          <div className="flex justify-evenly">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Company Logo
              </label>

              <input
                required
                type="file"
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight bg-white"
                accept=".jpg, .jpeg, .png"
                placeholder="Company Logo"
                onChange={(e) => {
                  if (e.target.files) {
                    setLogo(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Job Description
              </label>

              <input
                type="file"
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight bg-white"
                accept=".pdf"
                placeholder="Job Description"
                onChange={(e) => {
                  if (e.target.files) {
                    setJD(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex w-auto self-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover_secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
