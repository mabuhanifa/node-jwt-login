const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const User = require("./model/userModel");
const bcrypt = require("bcrypt");

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

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      name: name,
      email: email,
      password: hashedPass,
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
  });
  const isPassword = await bcrypt.compare(password, user.password);
  console.log(isPassword);
  
  if (user) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ status: "success", user: token });
  } else {
    res.json({ status: "error", user: "false" });
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
