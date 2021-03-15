import express, { Request, Response } from "express";
import path from "path";
import connection from "./config/db";
import hbs from "express-handlebars";
import {adminRouter} from "./routes/admin";

const app = express();
connection;

app.set('view engine', 'hbs');
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts', partialsDir: __dirname + '/views/partial'}));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', adminRouter);

app.listen(5000, () => console.log(`server is running at port 3000`))