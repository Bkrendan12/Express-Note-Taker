const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/notes", (req, res) => {
  // is __dirname the "db" folder that holds the db.json file, or is it the "devlop" folder that contains
  // everything in the project ?
  // utf8 encodes the data in human-readable format
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    // return the new note to the client.
    // give each note a unique id when it's saved (npm package?)
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
