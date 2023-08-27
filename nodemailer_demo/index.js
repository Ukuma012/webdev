import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const route = express.Router();
const port = process.env.PORT || 5000;


app.use('/v1', route);

app.listen(port, () => console.log(`Server started on port ${port}`));

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASS
    }
});

route.post('/test-mail', (req, res) => {
    const mailData = {
        from: '"Example team" <from@example.com>',
        to: 'user1@example.com',
        subject: 'Nice Nodemailer test',
        text: 'This is a test mail',
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
    };

    try {
    transport.sendMail(mailData, (error, info) => {
        if(error) {
            console.log("send failed");
            console.log(error.message);
            return;
        }

        console.log("send successful");
        console.log(info.messageId);
        res.status(200).json({ message: "send successful" });
    });

    } catch(e) {
        console.log("Error", e);
    }
});