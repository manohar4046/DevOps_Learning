const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect("mongodb://username:password@mongo:27017/todos?authSource=admin", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connected to MongoDB");
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api", routes);

    app.listen(port, () => {
      console.log(` Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    process.exit(1);
  }
}
