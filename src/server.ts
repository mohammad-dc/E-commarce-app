import express from "express";
import connection from "./config/db";

const app = express();
connection;
app.listen(3000, () => console.log(`server is running at port 3000`))