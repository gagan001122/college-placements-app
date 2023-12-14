"use client";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
export default function LoginForm() {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("api/university/login", {
        email: email,
        password: password,
      })
      .then(async () => {
        setLoading(false);
        await signIn("credentials", {
          callbackUrl: "/auth/home",
          email: email,
          password: password,
        });
      })
      .catch((err) => {
        if (err.status != 500 && err.response?.data?.message) {
          toast.error(err.response.data.message, { autoClose: 1000 });
        }
        setLoading(false);
      });
  };

  if (status == "loading") {
    return <div>Loading...</div>;
  } else if (status == "authenticated") {
    redirect("/auth/home", RedirectType.replace);
  } else {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="flex flex-col justify-center px-6 py-12 w-auto lg:px-8 bg-third h-auto  border-black rounded-xl shadow-lg shadow-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={(e: FormEvent) => {
                handleLogin(e);
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="/recovery"
                      className="font-semibold text-secondary hover:text-[#0073ff] hover:cursor-pointer"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    minLength={6}
                    value={password}
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    autoComplete="current-password"
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
                  {loading ? "Signing In..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
