import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  like: {
    type: Number,
    default: 0,
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
