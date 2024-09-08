const express = require("express");
const db = require("./config/db");
const Post = require("./models/Post");
const port = 3000;
const app = express();

app.use(express.json());

db()
  .then()
  .catch((err) => console.log(err));

app.get("/api/", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

app.get("/api/posts", (req, res) => {
  Post.find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.post("/api/posts", (req, res) => {
  Post.create({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.get("/api/posts/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.patch("/api/posts/:id", (req, res) => {
  let updatedPost = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  };
  Post.findByIdAndUpdate(req.params.id, updatedPost)
    .then((data) => {
      if (data) res.status(200).json({ data });
      else res.status(404).json({ message: "Post not found!" });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.delete("/api/posts/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) res.status(200).json({ message: "Post Deleted Successfully." });
      else res.status(404).json({ message: "Post not found!" });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
