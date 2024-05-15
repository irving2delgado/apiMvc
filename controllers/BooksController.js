const path = require("path");
let fs = require("fs");

const readData = () => {
  try {
    const data = fs.readFileSync(process.cwd() + "/models/db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

// Define a new endpoint to display information about a specific book
const getBookById = (req, res) => {
  const id = req.params.id; // Extract the id parameter from the request
  const data = readData();
  const book = data.books.find(book => book.id === parseInt(id)); // Find the book with the specified id
  if (!book) {
    return res.status(404).send("Book not found");
  }
  res.render(path.join(__dirname, "../views/book.html"), { book });
};

module.exports = {
  getBookById,
  getPath: (req, res) => {
    res.send(path.join(__dirname, "../views"));
  },
  getBookList: (req, res) => {
    const data = readData();
    res.render(__dirname + "/../views/index.html", {
      name: { ...data },
    });
  },
};

