import transport from "./transport";
import { Response } from "express";

const sendmailRegisterUser = (res: Response) => {

  const mailData = {
    from: '"Example team" <from@example.com>',
    to: "user1@example.com",
    subject: "アカウント開設のお知らせ",
    text: "アカウント開設どうもありがとうございます。",
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

export default sendmailRegisterUser;
