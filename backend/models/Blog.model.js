const mongoose = require("mongoose");


const blogSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Category: { type: String, required: true },
  Author: { type: String, required: true },
  Content: { type: String, required: true },
  Image: { type: String },
  user_id: { type: String, required: true }, //one to many relationships
});

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = { BlogModel };
