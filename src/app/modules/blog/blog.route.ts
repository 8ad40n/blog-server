import express from 'express';
import { auth } from '../../middlewares/auth';
import { BlogControllers } from './blog.controller';
const router = express.Router();

router.post("/", auth('user'),BlogControllers.addBlog);
router.patch("/:id", auth('user'),BlogControllers.updateBlog);
router.delete("/:id", auth('user'),BlogControllers.deleteBlog);
router.get("/", BlogControllers.getAllBlogs);

export const BlogRoutes = router;