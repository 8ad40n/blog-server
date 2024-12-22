import express from 'express';
import { auth } from '../../middlewares/auth';
import { BlogControllers } from './blog.controller';
const router = express.Router();

router.post("/", auth(),BlogControllers.addBlog);
router.patch("/:id", auth(),BlogControllers.updateBlog);
router.delete("/:id", auth(),BlogControllers.deleteBlog);

export const BlogRoutes = router;