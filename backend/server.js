import express from "express";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import trainingRouter from "./routes/trainingRoutes.js";
import userRouter from "./routes/userRoutes.js";
("./routes/userRoutes");
import menuRouter from "./routes/menusRoutes.js";

import uploadRouter from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/training", trainingRouter);
app.use("/api/users", userRouter);
app.use("/api/menu", menuRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENVP === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`listening on ${process.env.NODE_ENV} mode ${PORT}`.yellow.bold)
);
