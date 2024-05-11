require("dotenv").config();
const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => console.log("Server statar on port 3000"));
