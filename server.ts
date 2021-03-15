import express from "express";
import connection from "./config/db";
import {adminRouter} from "./routes/admin";
import {sliderRouter} from "./routes/slider";
import {TransitionRouter} from "./routes/transition";
import {TransitionPricingRouter} from "./routes/transition_pricing";

const app = express();
connection;

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/', adminRouter);
app.use('/', sliderRouter);
app.use('/', TransitionRouter);
app.use('/', TransitionPricingRouter);

app.listen(4000, () => console.log(`server is running at port 4000`))