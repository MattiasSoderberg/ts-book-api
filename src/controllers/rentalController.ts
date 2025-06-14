import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

const returnBook = async (req: Request, res: Response) => {
  const { rentalId } = req.params;

  if (!rentalId) {
    res.status(400).json({ message: "Rental ID missing" });
    return;
  }

  try {
    const rental = await prisma.rental.delete({ where: { id: rentalId } });

    if (!rental) {
      res.sendStatus(404);
      return;
    }

    await prisma.book.update({
      where: { id: rental.bookId },
      data: { availableCopies: { increment: 1 } },
    });

    res.status(200).json({ rental });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.meta.cause });
  }
};

export { returnBook };
