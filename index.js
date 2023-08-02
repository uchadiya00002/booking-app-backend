import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
const app = express();
const PORT = 5000;
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("connected to mongodb database");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("mongoDB Connected Succesfully!");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went Wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Server is Running on ${PORT}`);
});
