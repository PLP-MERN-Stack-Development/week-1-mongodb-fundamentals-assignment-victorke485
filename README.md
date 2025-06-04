# PLP Bookstore MongoDB Scripts

This project helps you add some books to a MongoDB database and run some example queries.

## What You Need

- [Node.js](https://nodejs.org/) installed on your computer
- [MongoDB](https://www.mongodb.com/) installed and running on your computer
- The `mongodb` package installed (run `npm install mongodb` in this folder)

## Files

- `insert_books.js` - Adds sample books to the database.
- `queries.js` - Has example MongoDB queries you can try.

## How to Use

### 1. Add Books to the Database

Open your terminal in this folder and run:

```sh
node insert_books.js
```

This will connect to MongoDB and add the sample books.

### 2. Try the Queries

1. Open your terminal and start the MongoDB shell:

    ```sh
    mongosh
    ```

2. Switch to the right database:

    ```sh
    use plp_bookstore
    ```

3. Copy queries from `queries.js` and paste them into the shell to see results.

