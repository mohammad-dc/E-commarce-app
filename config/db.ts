import mysql from "mysql";
import config from "./config";

const params = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

const Connect = async () =>
    new Promise((resolve, reject) => {
        const connection = mysql.createConnection(params);

        connection.connect((error: Error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(connection);
        });
    });

const Query = async (connection: any, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (error: Error, result: any) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });

export { Connect, Query };

