import express from "express";
import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
  getPostDetail
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostDetail);
router.post("/", createPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
