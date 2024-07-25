/*
This will be the starting file of the project
*/

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config = require("./config/server.config");
const db_config = require("./config/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");

//middleware
//JSON read as js object
app.use(express.json())

//connection with mongodb
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to the MongoDB");
});

db.once("open", () => {
  console.log("Connected to MongoDB");
  //create a function
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });

    if (user) {
      console.log("Admin already present");
      return;
    }
  } catch (err) {
    console.log("Error while reading the data", err);
  }
  try {
    user = await user_model.create({
      name: "Rishika",
      userId: "admin",
      email: "rishika@123gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Welcome1", 8),
    });
    console.log("Admin created", user);
  } catch {
    console.log("Error while creating admin");
  }
}

//stich the route to the server
//calling routes and passing the app object
require("./routes/auth.route")(app);
require("./routes/category.route")(app);

//start the server
app.listen(server_config.PORT, () => {
  console.log("Server started at Port: ", server_config.PORT);
});
