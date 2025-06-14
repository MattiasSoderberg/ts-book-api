import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes";
import bookRouter from "./routes/bookRoutes";
import rentalRouter from "./routes/rentalRoutes";

config();

const app = express();
const version = 1;

app.use(express.json());

app.use(`/v${version}/users`, userRouter);
app.use(`/v${version}/books`, bookRouter);
app.use(`/v${version}/rentals`, rentalRouter);

export default app;
