import express from "express"
import { getFeedPosts, getUserPosts, likePost, deletePost, updateComments } from "../controllers/posts-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

router.patch("/:id/likes", verifyToken, likePost);
router.delete("/:id/:userId", verifyToken, deletePost)
router.patch("/:id/:comment/:firstName/comments", verifyToken, updateComments)

export default router
