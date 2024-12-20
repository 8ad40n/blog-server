import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());


// routes
app.use("/api/user", UserRoutes);


// Global Error Handler
app.use(globalErrorHandler);

export default app;
