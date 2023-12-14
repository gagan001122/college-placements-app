"use client";
import { University } from "@prisma/client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { jsonToFormData } from "@/app/api/(helpers)/parsers";
function setAccount(setAcc: any) {
  axios
    .get(`/api/auth/university/account`)
    .then(({ data }) => {
      setAcc(data.acc);
    })
    .catch((e: Error) => {
      toast.error("Something went wrong!", {autoClose : 1000})
    });
}

export default function Profile() {
  const [acc, setAcc] = useState<University | any>();
  const [file, setFile] = useState<any>();
  const router = useRouter();
  const imgRef = useRef<any>();
  const updateAccount = () => {
    let formData = jsonToFormData(acc);
    formData.append("logo", file);
    axios
      .patch("/api/auth/university/account", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Profile updated successfully", {autoClose : 1000});
        router.push("/auth/profile");
      })
      .catch((e: Error) => {
        toast.error("Something went wrong", { autoClose: 1000 });
      });
  };

  useEffect(() => {
    setAccount(setAcc);
  }, []);
  return (
    <div className="flex flex-col h-auto m-10 bg-third p-5 rounded-xl shadow-xl">
      <div className="fixed top-12 right-16 flex flex-col ">
        <button
          className="bg-secondary text-third hover:bg-hover_secondary h-10 w-20 rounded-lg m-2"
          onClick={() => {
            updateAccount();
          }}
        >
          Save
        </button>
        <button
          className="bg-err text-third hover:bg-hover_err h-10 w-20 rounded-lg m-2"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>
      </div>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="font-bold leading-7 text-3xl  text-gray-900">
            Organization Information
          </h3>
          <div>
            {file ? (
              <div className="flex items-center">
                <Image
                  className="my-10 h-[200px] w-[200px] bg-slate-300 rounded-[50%] overflow-hidden border-2 shadow-lg"
                  alt="Logo"
                  onClick={() => {
                    imgRef.current?.click();
                  }}
                  src={URL.createObjectURL(file)}
                  width={200}
                  height={200}
                />
              </div>
            ) : (
              <Image
                className="my-10 text-center h-[200px] w-[200px] bg-slate-300 rounded-[50%] overflow-hidden border-2 shadow-lg hover:cursor-pointer"
                alt="Logo"
                onClick={() => {
                  imgRef.current?.click();
                }}
                src={`/U-${acc?.id}-logo.jpg`}
                width={200}
                height={200}
              />
            )}
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <input
                className="mt-1 p-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                defaultValue={acc?.name}
                required
                onChange={(e) => {
                  setAcc({ ...acc, name: e.target.value });
                }}
                placeholder="Organization's Name"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Website
              </dt>
              <input
                className="mt-1 p-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                defaultValue={acc?.website}
                onChange={(e) => {
                  setAcc({ ...acc, website: e.target.value });
                }}
                placeholder="Organization's Website"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <input
                className="p-1 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                defaultValue={acc?.email}
                placeholder="Email"
                disabled
                type="email"
              />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 h-16">
                About
              </dt>
              <textarea
                className="p-1 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 overflow-y-scroll h-44"
                defaultValue={acc?.about || ""}
                onChange={(e) => {
                  setAcc({ ...acc, about: e.target.value });
                }}
                placeholder="About your Organization"
              />
            </div>
          </dl>
        </div>
      </div>
      <input
        type="file"
        ref={imgRef}
        className="invisible "
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <ToastContainer />
    </div>
  );
}
