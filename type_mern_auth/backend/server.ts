import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
	res.send('Server is ready for TypeScript');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
