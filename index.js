const express = require("express");
const app = express();

// Function to read data from db.json
const readData = () => {
  try {
    const data = fs.readFileSync(process.cwd() + "/models/db.json");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
const books = require("./routes/books");

app.use("/", books);

// API endpoint to get book by ID
app.get("/api/books/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id, 10);
  const book = data.books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});