import prisma from "../prisma/prismaClient";
import app from "../app";
import request from "supertest";
import { Book, User } from "../generated/prisma";

let user1: User;
let user2: User;
let book: Book;

beforeAll(async () => {
  user1 = await prisma.user.create({
    data: { email: "testuser@test.com", password: "test" },
  });
  user2 = await prisma.user.create({
    data: { email: "testuser2@test.com", password: "test2" },
  });
  book = await prisma.book.create({
    data: {
      isbn: "123-1234567890",
      title: "Testing Book",
      author: "Tester",
      publishedYear: 2024,
      totalCopies: 1,
      availableCopies: 1,
      description: "A book for testing the API",
    },
  });
});

afterAll(async () => {
  await prisma.user.delete({ where: { id: user1.id } });
  await prisma.user.delete({ where: { id: user2.id } });
  await prisma.book.delete({ where: { id: book.id } });
});

describe("Test book controller", () => {
  test("It should get ALL books and return status 200", async () => {
    const res = await request(app).get("/v1/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.bookCount).toBeGreaterThan(0);
  });

  test("It should return status 200 and a book by ID", async () => {
    const res = await request(app).get(`/v1/books/${book.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.book.id).toEqual(book.id);
  });

  test("It should return status 200 and book rented", async () => {
    const res = await request(app)
      .post(`/v1/books/${book.id}/rent`)
      .send({ userId: user1.id });

    expect(res.statusCode).toBe(200);
    expect(res.body.book.id).toEqual(book.id);
  });

  test("It should return 400 when user already rented book", async () => {
    const res = await request(app)
      .post(`/v1/books/${book.id}/rent`)
      .send({ userId: user1.id });

    expect(res.statusCode).toBe(400);
  });

  test("It should return 400 when book is not available", async () => {
    const res = await request(app)
      .post(`/v1/books/${book.id}/rent`)
      .send({ userId: user2.id });

    expect(res.statusCode).toBe(400);
  });
});
