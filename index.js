import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import notaRouter from "./routes/nota.js";
import dotenv from "dotenv";

const app = express();
dotenv.config()

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5501/users/signup
app.use("/nota", notaRouter);
app.get("/", (req, res) => {
    res.send("Welcome to nota pembayaran API");
});

const port = process.env.PORT || 5505;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}).catch((error) => console.log(`${error} did not connect`));