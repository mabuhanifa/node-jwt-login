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
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.send({ name });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
