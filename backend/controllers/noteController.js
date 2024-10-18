const Note = require("../models/Note");

// Creer une note
exports.createNote = async (req, res) => {
  const { body, colors, position } = req.body;

  try {
    const note = await Note.create({
      user: req.user.id,
      body,
      colors,
      position,
    });
    res.status(201).json({ note, message: "Note created successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Note creation error", error: err.message });
  }
};

// Recuperer toutes les notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Notes retrieval error" });
  }
};

// Mettre à jour une note existante
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { body, colors, position } = req.body;

  try {
    // Trouver la note par ID et vérifier qu'elle appartient à l'utilisateur connecté
    const note = await Note.findOne({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Mettre à jour les champs de la note
    note.body = body || note.body;
    note.colors = colors || note.colors;
    note.position = position || note.position;

    // Sauvegarder la note mise à jour
    const updatedNote = await note.save();
    res.json({ updatedNote, message: "Note updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Rating update error",
      error: err.message,
    });
  }
};

// Supprimer une note existante
exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note successfully deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting note",
      error: err.message,
    });
  }
};
