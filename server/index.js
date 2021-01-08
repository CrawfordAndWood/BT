const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiPort = 5000;

//db config
const connectDB = require("./config/db");
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/api/auth"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
