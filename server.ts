import express, { Request, Response } from "express";
import path from "path";
import connection from "./config/db";
import hbs from "express-handlebars";
import {adminRouter} from "./routes/admin";
import {sliderRouter} from "./routes/slider";

const app = express();
connection;

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/', adminRouter);
app.use('/', sliderRouter);

app.listen(4000, () => console.log(`server is running at port 4000`))