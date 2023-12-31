export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT	: number;
			MONGO_URI: string;
			JWT_SECRET: string;
		}
	}
}
