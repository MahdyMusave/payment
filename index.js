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
    ],
    mode: "payment",
    success_url: "http://localhost:3000/complete",
    cancel_url: "http://localhost:3000/cancel",
  });

  console.log(session);
});

app.listen(3000, () => console.log("Server statar on port 3000"));
