require("dotenv").config();
const { name } = require("ejs");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SEECRET_KEY);

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Node.js and Express book",
          },
          unit_amount: 50 * 100,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "javaScript T-shirt",
          },
          unit_amount: 20 * 100,
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: `${process.env.BASE_URL}/complete`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });

  // console.log(session);
  //axion
  res.redirect(session.url);
});
app.get("/complete", (req, res) => {
  res.send("Your payment was successfly");
});
app.get("/cancel", (req, res) => {
  // res.send("payment cancel");
  res.redirect("/");
});

app.listen(3000, () => console.log("Server statar on port 3000"));
