import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware';
dotenv.config();
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes";

const app: Express = express();

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
	res.send('Server is ready for TypeScript!');
});

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));
