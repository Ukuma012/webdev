import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
import { errorHandler, notFound } from './middleware/errorMiddleware';
import connectDB from './config/db';
import userRoutes from "./routes/userRoutes";

connectDB();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
	res.send('Server is ready for TypeScript!');
});

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));
