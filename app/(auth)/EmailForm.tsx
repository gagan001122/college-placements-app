"use client";
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function EmailForm({ _setEmail, setOtp }: any) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/verify?forgot=true&user=uni", {
        email: email,
      })
      .then(({ data }) => {
        setLoading(false);
        _setEmail(email);
        setOtp(data.otp);
      })
      .catch((e: any) => {
        setLoading(false);
        if (e.response?.data?.message) {
          toast.error(e.response.data.message, { autoClose: 1000 });
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-third h-auto w-[25vw] border-black rounded-xl shadow-lg shadow-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Recover your account
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
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  autoComplete="email"
                  defaultValue={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover_secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
