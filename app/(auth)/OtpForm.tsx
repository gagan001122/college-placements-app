"use client";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function OtpForm({ _otp, verify }: any) {
  const [otp, setOtp] = useState("");
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (_otp != otp) {
      toast.error("Wrong OTP!", { autoClose: 1000 });
    } else {
      verify(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-third h-auto w-[25vw] border-black rounded-xl shadow-lg shadow-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verification
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e: FormEvent) => {
              handleFormSubmit(e);
            }}
          >
            <div>
              <label
                htmlFor="OTP"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                One Time Password
              </label>
              <div className="mt-2">
                <input
                  id="OTP"
                  name="OTP"
                  placeholder="Enter your OTP"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  type="text"
                  autoComplete="OTP"
                  required
                  min={6}
                  max={6}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover_secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
