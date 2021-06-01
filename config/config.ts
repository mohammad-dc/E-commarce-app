import dotenv from "dotenv";

dotenv.config();

// Server
const PORT = process.env.PORT || 4000;

//DB
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;

// JWT
const TOKEN_ADMIN_SECRET_KEY =
  process.env.TOKEN_ADMIN_SECRET_KEY ||
  "$2y$12$XsKEGjzozG415/mb7MBmxODdAHCD2pr2o60hgTmKbIzMagET1.ir6";
const TOKEN_CUSTOMER_SECRET_KEY =
  process.env.TOKEN_CUSTOMER_SECRET_KEY ||
  "$2y$12$RKeg2ZWFYDl4tfTaUMMHOu.tPnXMRDAmloyL09IWBVLRfZJ0PEyBO";
const TOKEN_DEALER_SECRET_KEY =
  process.env.TOKEN_DEALER_SECRET_KEY ||
  "$2y$12$dd0MqQNSkfvYRRgQPkI1qOwiUpVGXAeESSQK5SHQAIiO7dznH6A9a";
const TOKEN_ADMIN_ISSUER =
  process.env.TOKEN_ADMIN_ISSUER ||
  "$2y$12$mObJxFNHvJMsqbSareX7iu9ca11HdIhKpobhFr/3V7smwzyusN4rK";
const TOKEN_CUSTOMER_ISSUER =
  process.env.TOKEN_CUSTOMER_ISSUER ||
  "$2y$12$tAYqrE8tS0W.XU8c8noW.egHUVMGy26Rz5w0.npJXvUtMyQCDwaeO";
const TOKEN_DEALER_ISSUER =
  process.env.TOKEN_DEALER_ISSUER ||
  "$2y$12$PfCSV46q9hJwmILudGT2k.59ogwz/WO5SoWSldWQJmqFja0x/Xoii";

// Nexmo
const NEXMO_SECRET_KEY = process.env.NEXMO_SECRET_KEY || "2c0k9yBKivOMdFvb";
const NEXMO_PUBLIC_KEY = process.env.NEXMO_PUBLIC_KEY || "ec497654";

const server = {
  port: PORT,
  token: {
    adminSecretKey: TOKEN_ADMIN_SECRET_KEY,
    customerSecretKey: TOKEN_CUSTOMER_SECRET_KEY,
    dealerSecretKey: TOKEN_DEALER_SECRET_KEY,
    adminIssuerKey: TOKEN_ADMIN_ISSUER,
    customerIssuerKey: TOKEN_CUSTOMER_ISSUER,
    dealerIssuerKey: TOKEN_DEALER_ISSUER,
  },
  nexmo: {
    secretKey: NEXMO_SECRET_KEY,
    publicKey: NEXMO_PUBLIC_KEY,
  },
};

const mysql = {
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  user: DB_USER,
};

const config = {
  server,
  mysql,
};

export default config;
