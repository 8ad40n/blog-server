import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { AuthRoutes } from './app/modules/auth/auth.route';
import { BlogRoutes } from './app/modules/blog/blog.route';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// routes
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/blogs", BlogRoutes);


// Global Error Handler
app.use(globalErrorHandler);

export default app;
