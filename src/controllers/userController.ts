import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst();

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({ user });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.meta.cause });
  }
};

const getUserRentals = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User ID missing" });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        rentals: {
          include: { book: true },
          omit: { userId: true, bookId: true },
        },
      },
    });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({ rentals: user.rentals });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.meta.cause });
  }
};

const getUserHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User ID missing" });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { bookHistory: true },
    });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({ history: user.bookHistory });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.meta.cause });
  }
};

export { getUser, getUserRentals, getUserHistory };
