import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  content: String,
  image: String,
  authorId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
