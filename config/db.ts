import mysql from "mysql";
import config from "./config";

var db_config = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

export var con: any;

const handleDisconnect = () => {
  con = mysql.createConnection(db_config);

  con.connect(function (err: any) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
    console.log("database connected successfully");
  });

  con.on("error", function (err: any) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

export default { handleDisconnect };

// export const con = mysql.createConnection({
//     host: config.mysql.host,
//     user: config.mysql.user,
//     password: config.mysql.password,
//     database: config.mysql.database
// });

//  const connection = con.connect((error: Error) => {
//     if(error) throw error
//     console.log('database connected !!!')
//  });

//  export default connection;
