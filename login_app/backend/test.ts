import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test_login', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

interface IUser extends mongoose.Document {
    username: string;
    password: string;
}

const User = mongoose.model<IUser>('User', new mongoose.Schema({
    username: String,
    password: String,
}));

app.post('/api/register', async (req, res) => {
    const { username, passwrod } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User registerd successfully');
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});