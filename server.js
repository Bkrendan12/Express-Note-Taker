const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
    let db = JSON.parse(data);
    db.push({
      id: uuid.v4(),
      ...req.body,
    });
    fs.writeFile(
      path.join(__dirname, "db", "db.json"),
      JSON.stringify(db, null, 2),
      (err, data) => {
        if (err) throw err;
        res.json(db);
      }
    );
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
    let db = JSON.parse(data);
    db = db.filter((e) => {
      return e.id !== req.params.id;
    });
    fs.writeFile(
      path.join(__dirname, "db", "db.json"),
      JSON.stringify(db, null, 2),
      (err, data) => {
        if (err) throw err;
        res.json(db);
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
