const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./config/db");
// const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
