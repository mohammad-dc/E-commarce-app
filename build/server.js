"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var config_1 = __importDefault(require("./config/config"));
var db_1 = __importDefault(require("./config/db"));
var chat_1 = require("./routes/chat");
var admin_1 = require("./routes/admin");
var order_1 = require("./routes/order");
var slider_1 = require("./routes/slider");
var dealer_1 = require("./routes/dealer");
var user_1 = require("./routes/user");
var cart_1 = require("./routes/cart");
var credit_card_1 = require("./routes/credit_card");
var product_1 = require("./routes/product");
var transition_1 = require("./routes/transition");
var transition_pricing_1 = require("./routes/transition_pricing");
var app = express_1.default();
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(morgan_1.default("tiny"));
var http = require("http").createServer(app);
var io = require("socket.io")(http);
io.on("connection", function (socket) {
    console.log("user connected", socket.id);
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
    socket.on("chat message", function (msg) {
        console.log("message: " + msg);
    });
});
db_1.default;
app.use("/uploads", express_1.default.static("uploads"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/", chat_1.chatRouter);
app.use("/", order_1.orderRouter);
app.use("/", user_1.userRouter);
app.use("/", admin_1.adminRouter);
app.use("/", dealer_1.dealerRouter);
app.use("/", slider_1.sliderRouter);
app.use("/", cart_1.cartRouter);
app.use("/", credit_card_1.creditRouter);
app.use("/", product_1.productRouter);
app.use("/", transition_1.TransitionRouter);
app.use("/", transition_pricing_1.TransitionPricingRouter);
http.listen(config_1.default.server.port, function () {
    return console.log("server is running at port 4000");
});
