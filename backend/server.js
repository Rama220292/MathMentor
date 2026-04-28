const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", questionRoutes);


app.use((req, res) => {
  res.status(404).json({ err: "Route not found" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection err:", err);
    process.exit(1);
  });