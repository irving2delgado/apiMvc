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

module.exports = {
  getPath: (req, res) => {
    res.send(path.join(__dirname, "../views"));
  },
  getBookList: (req, res) => {
    const data = readData();
    res.render(__dirname + "/../views/index.html", {
      name: { ...data },
    });
  },
  getBookById: (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id, 10);
    const book = data.books.find((book) => book.id === id);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.render(__dirname + "/../views/book.html", {
      book,
    });
  }
};