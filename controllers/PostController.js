const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
  try {
    let username;
    let categoryName;

    if (req.query?.username) {
      username = req.query.username;
    } else if (req.query?.categoryName) {
      categoryName = req.query.categoryName;
    }

    let posts = [];

    if (username) {
      try {
        posts = await Post.find({ username: username });
        res.status(200).send(posts);
      } catch (err) {
        res.status(400).send("Data Not Found");
      }
    } else if (categoryName) {
      try {
        posts = await Post.find({ category: { $in: categoryName } });
        res.status(200).send(posts);
      } catch (err) {
        res.status(400).send("Data Not Found");
      }
    } else {
      try {
        posts = await Post.find({});
        res.status(200).send(posts);
      } catch (err) {
        res.status(400).send("Data Not Found");
      }
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(400).send("Post Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const addPost = async (req, res) => {
  try {
    const newPost = await new Post(req.body);
    const post = await newPost.save();
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(400).send("Something Wrong");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      await Post.updateOne({ _id: post.id }, req.body, {
        returnOriginal: true,
      });
      res.status(200).send(post);
    } else {
      res.status(404).send("Post Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req);
    if (post.username === req.body.username) {
      await Post.deleteOne({ _id: post.id });
      res.status(200).send(post);
    } else {
      res.status(404).send("Post Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
};
