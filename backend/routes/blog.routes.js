const { Router } = require("express");
const { BlogModel } = require("../models/Blog.model");

const blogRouter = Router();

blogRouter.get("/", async (req, res) => {
  // console.log("reached blogRouter");
  const blogs = await BlogModel.find();
  res.send({ Blogs: blogs });
});

blogRouter.post("/add", async (req, res) => {
  const { Title, Category, Author, Content, Image } = req.body;
  const userID = req.userID;
  const new_blog = await BlogModel.create({
    Title,
    Category,
    Author,
    Content,
    Image,
    user_id: userID,
  });
  res.json({ blogs: new_blog });
  res.json({ message: "Blog Added Successfully" });
});

blogRouter.patch("/edit/:blogID", async (req, res) => {
  const blogID = req.params.blogID;
  const userID = req.userID;
  const payload = req.body;

  try {
    const blogs_to_update = await BlogModel.findOneAndUpdate(
      { _id: blogID, user_id: userID },
      payload
    );
    if (blogs_to_update) {
      res.json({ message: "Blog updated successfully" });
    } else {
      res.json({ message: "Blog cannot be updated" });
    }
  } catch (error) {}
});

blogRouter.delete("/delete/:blogID", async (req, res) => {
  const blogID = req.params.blogID;
  const userID = req.userID;
  try {
    const blogs_to_Delete = await BlogModel.findOneAndDelete({
      _id: blogID,
      user_id: userID,
    });
    if (blogs_to_Delete) {
      res.json({ message: "Blog deleted successfully" });
    } else {
      res.json({ message: "Blog cannot be deleted" });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  blogRouter,
};
