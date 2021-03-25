import express from "express";
import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
  getPostDetail,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostDetail);
router.post("/", createPosts);
router.get("/:id/vote", likePost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
