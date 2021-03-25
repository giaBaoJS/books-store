import Post from "../model/post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  const authorId = req.query.authorId;
  if (authorId) {
    try {
      const postMessage = await Post.find({ authorId: authorId });
      res.status(200).json(postMessage);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    try {
      const postMessage = await Post.find({})
        .sort({ createdAt: "desc" })
        .exec();
      res.status(200).json(postMessage);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

export const getPostsByAuthor = async (req, res) => {
  const authorId = req.query.author;
  try {
    const postMessage = await Post.find({ authorId: authorId });
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPosts = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostDetail = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  try {
    const postDetail = await Post.findById(_id);
    res.status(200).json(postDetail);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatePost = await Post.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id " + _id);
  const like = await Post.findOneAndUpdate(
    { _id: _id },
    { $inc: { like: 1 } }
  ).exec();

  res.json(like);
};
