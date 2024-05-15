// const express = require("express");
// const app = express();

// app.set("view engine", "html");
// app.engine("html", require("ejs").renderFile);
// const books = require("./routes/books");

// app.use("/", books);

// app.listen(3000, () => {
//   console.log("server running on port 3000");
// });

const express = require("express");
const app = express();

// Set up EJS as the view engine
app.set("view engine", "ejs"); // Change "html" to "ejs"
app.set("views", __dirname + "/views"); // Set the views directory

// Import the books router
const booksRouter = require("./routes/books");

// Use the books router for requests starting with /books
app.use("/books", booksRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
