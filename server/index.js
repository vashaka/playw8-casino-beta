const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// res.setHeader('Access-Control-Allow-Origin', '*');
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());
const buttonClickSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const ButtonClick = mongoose.model("ButtonClick", buttonClickSchema);

app.get("/api/button-click/latest", async (req, res) => {
  const { userId } = req.query;
  const lastClick = await ButtonClick.findOne({ userId }).sort({
    timestamp: -1,
  });
  res.status(200).json({ timestamp: lastClick ? lastClick.timestamp : null });
});

app.post("/api/button-click", async (req, res) => {
  const { userId, timestamp } = req.body;

  const lastClick = await ButtonClick.findOne({ userId }).sort({
    timestamp: -1,
  });
  if (
    lastClick &&
    new Date() - new Date(lastClick.timestamp) < 24 * 60 * 60 * 1000
  ) {
    const timeToWait = new Date(
      lastClick.timestamp.getTime() + 24 * 60 * 60 * 1000
    );
    res.status(403).json({
      message: `You have to wait until ${timeToWait.toLocaleString()} before you can click again.`,
    });
    return;
  }

  const buttonClick = new ButtonClick({ userId, timestamp });
  await buttonClick.save();

  res.status(201).send("Button click saved");
});

// /

app.use("/", authRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
