const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
const { blogRouter } = require("./routes/blog.routes");
const { auth } = require("./middlewares/auth");

const app = express();
app.use(express.json());
app.use(cors({
    origin : "*"
}))

app.get("/", (req, res) => {
  res.send("Welcome to Blog App, API is working!");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // Now you can use the 'connection' object to interact with the MongoDB database.
  const is_User = await UserModel.findOne({ email: email });
  if (is_User) {
    return res.json({ messgae: "User already exists! Try Loggin in?" });
  }
  //hashing the password
  bcrypt.hash(password, 8, async function (err, hash) {
    await UserModel.create({ name, email, password: hash });
  });
  res.json({ message: "SignUp Successful" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Now you can use the 'connection' object to interact with the MongoDB database.
  const is_User = await UserModel.findOne({ email });
  if (is_User) {
    const hashed_password = is_User.password;
    bcrypt.compare(password, hashed_password, function (err, result) {
      if (result) {
        const token = jwt.sign({ userID: is_User._id }, "oursecret");
        return res.json({ message: "Login Successfull", token: token });
      } else {
        return res.json({ message: "invalid crediantials! Login Failed" });
      }
    });
  }
});

app.use(auth);
app.use("/blog", blogRouter);

app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connection established to DB");
  } catch (error) {
    console.error("Error while connecting to DB");
    console.error(error);
  }
  console.log("Listening on http://localhost:8000");
});
