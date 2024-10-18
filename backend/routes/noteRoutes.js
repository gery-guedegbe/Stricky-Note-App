const express = require("express");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createNote); // Créer une note
router.get("/", protect, getNotes); // Obtenir toutes les notes de l'utilisateur
router.patch("/:id", protect, updateNote); // Mettre à jour une note par ID
router.delete("/:id", protect, deleteNote); // Supprimer une note par ID

module.exports = router;
