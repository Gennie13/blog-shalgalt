const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");
const rfs = require("rotating-file-stream");
const dotenv = require("dotenv");
const path = require("path");

const userRouter = require("./routers/userRouter");
const userCategory = require("./routers/categoryRouter");


dotenv.config({path: "./config/config.env"});
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");


const app = express();
connectDB();


app.use(express.static(path.join(__dirname,"public")))

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // 1uduruur n
    path: path.join(__dirname, 'log')
})

app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));


app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", userCategory);
app.use(errorHandler);

const server = app.listen(process.env.PORT, console.log(`server ----->  ${process.env.PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Алдаа гарлаа ----->  ${err.message}`);
    server.close(()=> {
        process.exit(1);
    });
})