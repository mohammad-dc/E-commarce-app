import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connection from "./config/db";
import {adminRouter} from "./routes/admin";
import {sliderRouter} from "./routes/slider";
import {dealerRouter} from "./routes/dealer";
import {userRouter} from "./routes/user";
import {cartRouter} from "./routes/cart";
import {creditRouter} from "./routes/credit_card";
import {productRouter} from "./routes/product";
import {TransitionRouter} from "./routes/transition";
import {TransitionPricingRouter} from "./routes/transition_pricing";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on("connection", function(socket: any) {
  console.log("a user connected");

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg: string) => {
    console.log('message: ' + msg);
  });

});

connection;

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', userRouter);
app.use('/', adminRouter);
app.use('/', dealerRouter);
app.use('/', sliderRouter);
app.use('/', cartRouter);
app.use('/', creditRouter);
app.use('/', productRouter);
app.use('/', TransitionRouter);
app.use('/', TransitionPricingRouter);

http.listen(4000, () => console.log(`server is running at port 4000`))