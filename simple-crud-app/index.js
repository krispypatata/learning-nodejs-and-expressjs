const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route.js");
const app = express();

// middleware
// allow the server to read json input
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);


app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});



// connecting to the database
mongoose
  .connect(
    "mongodb+srv://admin:8I7dFxPIIig7bi1R@backenddb.hyqj6nt.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    // running the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
