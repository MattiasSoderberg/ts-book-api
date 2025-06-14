# ts-book-api

## Set up

Clone the repo, install all dependencies and generate a prisma client

1. Clone the repo
2. Create a .env file and copy the context from .env.example
3. Run `npm install`
4. Run `npx prisma generate`

## Scripts

`npm run dev` - starting the api for development

`npm run test` - run tests

## Postman

Open the Postman Collection in Postman to test the endpoints manually.

Run certain endpoints to save variables.

1. Get all books to save a bookId
2. Get user to save a userId
3. Rent book to save a rentalId

## Endpoints

### Books

`GET /v1/books` - list all books

`GET /v1/books/:bookId` - get a book by ID

`POST /v1/books/:bookId/rent` - rent a book

### Users

`GET /v1/users` - get a user for testing in Postman

`GET /v1/users/:userId/books` - get rented books

`GET /v1/users/:userId/history` - get user book history

### Rentals

`POST /v1/rentals/:rentalId/return` - return a rented book
