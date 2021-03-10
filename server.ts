import express, { Request, Response } from "express";
import path from "path";
import connection from "./config/db";
import hbs from "express-handlebars";
import {adminRouter} from "./routes/admin";

const app = express();
connection;

app.engine('hbs', hbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', adminRouter);

app.listen(5000, () => console.log(`server is running at port 3000`))