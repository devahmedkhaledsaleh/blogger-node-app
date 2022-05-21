const mongoose = require("mongoose");

module.exports = mongoose
  // .connect("mongodb://localhost:27017/Blogger")
  .connect("mongodb+srv://ahmedsaleh:ASP01113438665@cluster0.ybauz.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });
//mongodb+srv://ahmedsaleh:<password>@cluster0.ybauz.mongodb.net/?retryWrites=true&w=majority