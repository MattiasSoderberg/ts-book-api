# ts-book-api

## Set up

Clone the repo and install all dependencies by running <code>npm install</code>

Create a .env file and copy the context from .env.example

## Scripts

<code>npm run dev</code> - starting the api for development

<code>npm run test</code> - run tests

## Postman

Open the Postman Collection in Postman to test the endpoints manually.

Run certain endpoints to save variables.

1. Get all books to save a bookId
2. Get user to save a userId
3. Rent book to save a rentalId

## Endpoints

### Books

<code>GET /v1/books</code> - list all books

<code>GET /v1/books/:bookId</code> - get a book by ID

<code>POST /v1/books/:bookId/rent</code> - rent a book

### Users

<code>GET /v1/users</code> - get a user for testing in Postman

<code>GET /v1/users/:userId/books</code> - get rented books

<code>GET /v1/users/:userId/history</code> - get user book history

### Rentals

<code>POST /v1/rentals/:rentalId/return</code> - return a rented book
