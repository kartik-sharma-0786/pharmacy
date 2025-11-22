require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

// Event listeners
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  });
}

module.exports = {
  mongoConnect,
};
