const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const { port } = require("./config");
const auth = require("./routes/auth");
const characters = require("./routes/characters");
const movies = require("./routes/movies");
const genre = require("./routes/genre");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(cookies());
const { connection } = require("./config/db");
connection();

auth(app);
characters(app);
movies(app);
genre(app);

app.get("/", (req, res) => {
  return res.json({ Disney: "API" });
});

app.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
