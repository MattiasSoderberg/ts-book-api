import data from "../../books.json";
import { Book } from "../generated/prisma";
import prisma from "../prisma/prismaClient";

const { books } = data;

(async () => {
  console.log("Creating test user");

  const user = await prisma.user.create({
    data: { email: "test@example.com", password: "password" },
  });

  console.log("User created", user);

  console.log("Seeding books");

  const parsedJSON: Omit<Book, "id">[] = JSON.parse(JSON.stringify(books));
  const data = parsedJSON.map((book) => ({
    ...book,
    availableCopies: book.totalCopies,
  }));

  await prisma.book.createMany({ data });

  console.log(`Books seeded`);
})();
