const express = require("express");
const Movie = require("../models/Movie");
const router = express.Router();

// Obtenir tous les films
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un nouveau film
router.post("/", async (req, res) => {
  const { title, synopsis, releaseYear,  } = req.body;
  try {
    const newMovie = new Movie({
      title,
      synopsis,
      releaseYear,
      
    });
    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtenir un film par ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour un film par ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un film par ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json({ message: "Movie deleted", movie: deletedMovie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
