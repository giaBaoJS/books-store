import Author from "../model/author.js";
import mongoose from "mongoose";

export const getAuthors = async (req, res) => {
  try {
    const Authors = await Author.find({});
    res.status(200).json(Authors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createAuthor = async (req, res) => {
  const author = req.body;
  const { name } = req.body;

  const existingAuthor = await Author.findOne({ name });
  if (existingAuthor)
    return res.status(400).json({ message: "Author already exists." });
  const newAuthor = new Author(author);

  try {
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAuthorDetail = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Author with that id");
  try {
    const authorDetail = await Author.findById(_id);
    res.status(200).json(authorDetail);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateAuthor = async (req, res) => {
  const { id: _id } = req.params;
  const author = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Author with that id");

  const updatePost = await Author.findByIdAndUpdate(
    _id,
    { ...author, _id },
    {
      new: true,
    }
  );

  res.json(updatePost);
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Author with that id");

  await Author.findByIdAndRemove(id);

  res.json({ message: "Auth deleted successfully" });
};
