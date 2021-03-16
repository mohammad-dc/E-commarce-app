import express from "express";
import connection from "./config/db";
import {adminRouter} from "./routes/admin";
import {sliderRouter} from "./routes/slider";
import {dealerRouter} from "./routes/dealer";
import {userRouter} from "./routes/user";
import {cartRouter} from "./routes/cart";
import {productRouter} from "./routes/product";
import {TransitionRouter} from "./routes/transition";
import {TransitionPricingRouter} from "./routes/transition_pricing";

const app = express();
connection;

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', userRouter);
app.use('/', adminRouter);
app.use('/', dealerRouter);
app.use('/', sliderRouter);
app.use('/', cartRouter);
app.use('/', productRouter);
app.use('/', TransitionRouter);
app.use('/', TransitionPricingRouter);

app.listen(4000, () => console.log(`server is running at port 4000`))