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

const transporter = nodemailer.createTransport({
    port: 25,
    host: localhost,
});

route.post('/test-mail', (req, res) => {
    const mailData = {
        from: 'Fromアドレス',
        to: 'Toアドレス',
        subject: 'nodemailer test mail',
        text: 'This is a test mail',
    };

    try {
    transporter.sendMail(mailData, (error, info) => {
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