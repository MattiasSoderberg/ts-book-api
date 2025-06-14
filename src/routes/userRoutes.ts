import { Router } from "express";
import {
  getUser,
  getUserHistory,
  getUserRentals,
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.get("/:userId/books", getUserRentals);
userRouter.get("/:userId/history", getUserHistory);

export default userRouter;
