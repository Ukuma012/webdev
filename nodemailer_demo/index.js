import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const route = express.Router();
const port = process.env.PORT || 5000;

app.use('/', (req, res) => {
    res.send('Server is ready');
})

app.listen(port, () => console.log(`Server started on port ${port}`));