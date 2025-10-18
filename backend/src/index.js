import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import job from "./lib/cron.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

job.start();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
