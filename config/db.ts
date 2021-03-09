import mysql from "mysql";
import config from "./config";

const connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

connection.connect((err: Error) => {
    if(err)console.error(`database Error: ${err}`);
    console.log('database connected!!!')
});

export default connection;

