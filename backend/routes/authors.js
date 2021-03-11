import express from "express";
import {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorDetail,
} from "../controllers/authors.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAuthors);
router.get("/:id", getAuthorDetail);
router.post("/add", createAuthor);
router.patch("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
