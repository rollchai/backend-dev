require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler } = require("./utils/errorHandler");

const app = express();


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());


app.use("/api/v1/auth", require("./routes/authRoutes"));

app.use("/api/v1/tasks", taskRoutes);


app.use(errorHandler);
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
