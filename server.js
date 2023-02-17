const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const User = require("./model/userModel");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.4fc0zmu.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log(`MongoDb server connected`))
  .catch((err) => console.log(err));

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
    password: password,
  });
  if (user) {
    res.json({ status: "success" });
  } else {
    res.json({ status: "error", user: "false" });
  }
});

app.get("/api/users", (req, res) => {
  const user = User.find({});
  console.log(user);
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
