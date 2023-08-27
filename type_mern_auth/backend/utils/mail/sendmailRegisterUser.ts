import transport from "./transport";
import { Response } from "express";

const sendmailRegisterUser = (res: Response, email: string) => {

  const mailData = {
    from: '"Example team" <from@example.com>',
    to: email,
    subject: "アカウント開設のお知らせ",
    text: "アカウント開設どうもありがとうございます。",
  };

  transport.sendMail(mailData, (error, info) => {
    if(error) {
      res.status(400);
      throw new Error("Email send failed");
    }

    console.log('Message sent: %s', info.messageId);
  })
}

export default sendmailRegisterUser;
