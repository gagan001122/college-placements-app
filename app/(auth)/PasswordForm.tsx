"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function PasswordForm({email} : any) {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const router = useRouter();
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(!(password == cpassword && password.length >= 6)){
        return;
    }
    axios.patch('/api/verify', {
        user : "UNIVERSITY",
        email : email,
        password : password
    }).then(({data})=>{
        toast.success("Password Changed Successfully!", {autoClose : 1000})
        router.replace("/")
    })
    .catch((e : any)=>{
        return NextResponse.json({message : e.message}, {status : 500})
    })
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-third h-auto w-[25vw] border-black rounded-xl shadow-lg shadow-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            New Password
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
          onSubmit={handleFormSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  min={6}
                  placeholder="Minimum 6 characters"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password!"
                  min={6}
                  onChange={(e) => {
                    setCpassword(e.target.value);
                  }}
                  type="password"
                  autoComplete="cpassword"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={!(password == cpassword && password.length >= 6)}
                className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  password == cpassword && password.length >= 6
                    ? "bg-secondary hover:bg-hover_secondary focus-visible:outline-indigo-600"
                    : "bg-red-600 hover:cursor-auto"
                }`}
              >
                {password.length < 6 ? "Password is too short":  password == cpassword && password.length >= 6
                  ? "Update"
                  : "Passwords Do Not Match!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
