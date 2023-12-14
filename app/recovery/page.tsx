"use client";

import { useState } from "react";
import EmailForm from "../(auth)/EmailForm";
import OtpForm from "../(auth)/OtpForm";
import PasswordForm from "../(auth)/PasswordForm";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  return (
    <>
      {verified ? (
        <PasswordForm email={email} />
      ) : otp ? (
        <OtpForm _otp={otp} verify={setVerified} />
      ) : (
        <EmailForm _setEmail={setEmail} setOtp={setOtp} />
      )}
    </>
  );
}
