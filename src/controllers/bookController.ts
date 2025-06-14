import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json({ books, bookCount: books.length });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.meta.cause });
  }
};

const getBookByID = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  if (!bookId) {
    res.status(400).json({ message: "Book ID missing" });
    return;
  }

  try {
    const book = await prisma.book.findFirst({ where: { id: bookId } });

    if (!book) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({ book });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.meta.cause });
  }
};

const rentBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { userId } = req.body;

  if (!bookId) {
    res.status(400).json({ message: "Book ID missing" });
    return;
  }

  if (!userId) {
    res.status(400).json({ message: "User ID missing" });
    return;
  }

  try {
    const book = await prisma.book.findFirst({
      where: { id: bookId },
      include: { activeUsers: true },
    });

    if (!book) {
      res.sendStatus(404);
      return;
    }

    if (book.activeUsers.some((user) => user.userId === userId)) {
      res.status(400).json({ message: "User already rented this book" });
      return;
    }

    if (book.availableCopies <= 0) {
      res.status(400).json({ message: "Book is not available" });
      return;
    }

    const rentedBook = await prisma.book.update({
      where: { id: book.id },
      data: {
        availableCopies: { decrement: 1 },
        activeUsers: { create: [{ userId: userId }] },
        userHistory: { connect: { id: userId } },
      },
    });

    res.status(200).json({ book: rentedBook });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.meta.cause });
  }
};

export { getAllBooks, getBookByID, rentBook };
