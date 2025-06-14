import { Router } from "express";
import {
  getAllBooks,
  getBookByID,
  rentBook,
} from "../controllers/bookController";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBookByID);
bookRouter.post("/:bookId/rent", rentBook);

export default bookRouter;
