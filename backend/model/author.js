import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true, 
  },
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
