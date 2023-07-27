import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import movieRouter from "./api/movieRouter";
import { logError, returnError } from "./errorHandling/errorHandler";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4000", "http://localhost:3000"],
  })
);
app.use(movieRouter);
app.use(logError);
app.use(returnError);

app.listen(process.env.PORT, () => {
  console.log("Server is running on: ", process.env.PORT);
});
