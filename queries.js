// 1. Find all books in a specific genre (replace "Technology" with your desired genre)
db.books.find({ genre: "Technology" })

// 2. Find books published after a certain year (replace 2018 with your desired year)
db.books.find({ published_year: { $gt: 2018 } })

// 3. Find books by a specific author (replace "Jane Doe" with the author's name)
db.books.find({ author: "Jane Doe" })

// 4. Update the price of a specific book (replace "The Art of Node.js" and 39.99 as needed)
db.books.updateOne(
    { title: "The Art of Node.js" },
    { $set: { price: 39.99 } }
)

// 5. Delete a book by its title (replace "Cooking 101" with the book's title)
db.books.deleteOne({ title: "Cooking 101" })

// Find books that are both in stock and published after 2010,
// return only title, author, and price fields
db.books.find(
    { in_stock: true, published_year: { $gt: 2010 } },
    { _id: 0, title: 1, author: 1, price: 1 }
)

// Sort books by price in ascending order
db.books.find(
    {},
    { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 })

// Sort books by price in descending order
db.books.find(
    {},
    { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: -1 })

// Pagination: Get page 1 (first 5 books by price ascending)
db.books.find(
    {},
    { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 }).skip(0).limit(5)

// Pagination: Get page 2 (next 5 books by price ascending)
db.books.find(
    {},
    { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 }).skip(5).limit(5)

// Aggregation: Calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      genre: "$_id",
      averagePrice: { $round: ["$averagePrice", 2] },
      count: 1
    }
  }
])

// Aggregation: Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      author: "$_id",
      bookCount: 1
    }
  }
])

// Aggregation: Group books by publication decade and count them
db.books.aggregate([
  {
    $addFields: {
      decade: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      decade: "$_id",
      count: 1
    }
  },
  { $sort: { decade: 1 } }
])

// Create an index on the title field for faster searches
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() to demonstrate performance improvement with the title index
db.books.find({ title: "The Art of Node.js" }).explain("executionStats")

// Use explain() to demonstrate performance improvement with the compound index
db.books.find({ author: "Jane Doe", published_year: 2019 }).explain("executionStats")
