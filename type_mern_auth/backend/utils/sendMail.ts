import nodemailer from "nodemailer";
import { Response } from "express";

const sendMail = (res: Response) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailData = {
    from: '"Example team" <from@example.com>',
    to: "user1@example.com",
    subject: "Nice Nodemailer test",
    text: "This is a test mail",
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer",
  };

  try {
    transport.sendMail(mailData, (error, info) => {
      if (error) {
        console.log("send failed");
        console.log(error.message);
        return;
      }

      console.log("send successful");
      console.log(info.messageId);
      res.status(200).json({ message: "send successful" });
    });
  } catch (e) {
    console.log("error", e);
  }
};

export default sendMail;
