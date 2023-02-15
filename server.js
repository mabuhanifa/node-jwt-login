const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.post("/api/register", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  res.send({ name });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
