const mongoose = require("mongoose");

async function db() {
  await mongoose.connect(
    "mongodb+srv://Tahirkhan7:Tahirkhan7@cluster0.9hgxvan.mongodb.net/expressjs-crud"
  );
}

module.exports = db;
