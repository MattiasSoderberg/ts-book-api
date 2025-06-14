import { Router } from "express";
import { returnBook } from "../controllers/rentalController";

const rentalRouter = Router();

rentalRouter.post("/:rentalId/return", returnBook);

export default rentalRouter;
