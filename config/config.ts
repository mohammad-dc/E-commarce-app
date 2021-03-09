import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'kiwidb';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_USER = process.env.DB_USER || 'root';

const server= { 
    port : PORT
};

const mysql = {
     host: DB_HOST,
     database: DB_NAME,
     password: DB_PASSWORD,
     user: DB_USER
};

const config ={
    server,
    mysql
};

export default config;