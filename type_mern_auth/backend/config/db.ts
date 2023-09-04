import mysql, { Connection } from 'mysql2/promise';

const connectDB = async () => {
    try {
        const connection: Connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });

        console.log('MySQL connected');

    } catch(error: any) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

