import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  })
);

export const sendMail = (to: string, subject: string, bodyText: string) => {
  var mailOptions = {
    from: String(process.env.MAIL_ID),
    to: to,
    subject: subject,
    text: bodyText,
  };
  return new Promise<string>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        reject(error);
      } else {
        resolve("success");
      }
    });
  });
};
