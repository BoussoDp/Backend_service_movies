const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movies");
const app = express();
const PORT = process.env.PORT || 4000;

mongoose
  .connect("mongodb://localhost:27017/movies_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Backend Service Movies is Running");
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
