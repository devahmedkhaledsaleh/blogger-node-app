const express = require("express");
const multer = require("multer");
var cors = require('cors')
var path = require('path')

const app = express();

app.use(cors())

app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")));

 require("./db/connectDB");


const AuthRoute = require("./routes/auth");
const UserRoute = require("./routes/users");
const PostRoute = require("./routes/posts");
const CategoryRoute = require("./routes/categories");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).send("File Has Been Uploaded");
});

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/posts", PostRoute);
app.use("/api/categories", CategoryRoute);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Listen In Port 3000");
});
