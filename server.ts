import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/config";
import connection from "./config/db";
import { adminRouter } from "./routes/admin";
import { orderRouter } from "./routes/order";
import { sliderRouter } from "./routes/slider";
import { dealerRouter } from "./routes/dealer";
import { userRouter } from "./routes/user";
import { cartRouter } from "./routes/cart";
import { productRouter } from "./routes/product";
import { TransitionRouter } from "./routes/transition";
import { TransitionPricingRouter } from "./routes/transition_pricing";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

connection;

app.use("/uploads", express.static("uploads"));
app.use(express.static("build"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Welcom")
);
app.use("/", orderRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/", dealerRouter);
app.use("/", sliderRouter);
app.use("/", cartRouter);
app.use("/", productRouter);
app.use("/", TransitionRouter);
app.use("/", TransitionPricingRouter);

app.listen(config.server.port, () =>
  console.log(`server is running at port ${config.server.port}`)
);
