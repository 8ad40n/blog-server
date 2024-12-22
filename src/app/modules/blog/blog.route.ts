import express from 'express';
import { auth } from '../../middlewares/auth';
import { BlogControllers } from './blog.controller';
const router = express.Router();

router.post("/", auth(),BlogControllers.addBlog);

export const BlogRoutes = router;