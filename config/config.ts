import dotenv from "dotenv";

dotenv.config();

// Server
const PORT = process.env.PORT || 4000;

//DB
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'kiwidb';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_USER = process.env.DB_USER || 'root';

// JWT
const TOKEN_ADMIN_SECRET_KEY = process.env.TOKEN_ADMIN_SECRET_KEY || '$2y$12$XsKEGjzozG415/mb7MBmxODdAHCD2pr2o60hgTmKbIzMagET1.ir6';
const TOKEN_USER_SECRET_KEY = process.env.TOKEN_USER_SECRET_KEY || '$2y$12$RKeg2ZWFYDl4tfTaUMMHOu.tPnXMRDAmloyL09IWBVLRfZJ0PEyBO';
const TOKEN_ADMIN_ISSURE = process.env.TOKEN_ADMIN_ISSURE || '$2y$12$mObJxFNHvJMsqbSareX7iu9ca11HdIhKpobhFr/3V7smwzyusN4rK';
const TOKEN_USER_ISSURE = process.env.TOKEN_USER_ISSURE || '$2y$12$tAYqrE8tS0W.XU8c8noW.egHUVMGy26Rz5w0.npJXvUtMyQCDwaeO';

// Nexmo
const NEXMO_SECRET_KEY = process.env.NEXMO_SECRET_KEY || '2c0k9yBKivOMdFvb';
const NEXMO_PUBLIC_KEY = process.env.NEXMO_PUBLIC_KEY || 'ec497654';

const server= { 
    port : PORT,
    token: {
        adminSecretKey: TOKEN_ADMIN_SECRET_KEY,
        userSecretKey: TOKEN_USER_SECRET_KEY,
        adminIssureKey: TOKEN_ADMIN_ISSURE,
        userIssureKey: TOKEN_USER_ISSURE
    },
    nexmo: {
        secretKey: NEXMO_SECRET_KEY,
        publicKey: NEXMO_PUBLIC_KEY
    }
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