import { useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { NoteContext } from "../context/NoteContext";

const Color = ({ color }) => {
  const { notes, setNotes, selectedNote } = useContext(NoteContext);

  const changeColor = async () => {
    if (!selectedNote) {
      alert("You must select a note before changing colors");
      return;
    }

    try {
      // Trouver l'index de la note actuellement sélectionnée
      const currentNoteIndex = notes.findIndex(
        (note) => note._id === selectedNote._id
      );

      // Vérifie si la note existe dans la liste
      if (currentNoteIndex === -1) {
        alert("The selected note does not exist.");
        return;
      }

      // Crée une nouvelle version de la note avec la couleur mise à jour
      const updatedNote = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      };

      // Met à jour la liste des notes localement
      const newNotes = [...notes];
      newNotes[currentNoteIndex] = updatedNote;
      setNotes(newNotes);

      // Appel à l'API pour mettre à jour la note dans la base de données
      await axiosInstance.patch(`/notes/${selectedNote._id}`, {
        colors: JSON.stringify(color),
      });
    } catch (error) {
      console.error("Failed to change color:", error);
      alert("An error occurred while trying to change the color.");
    }
  };

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};

export default Color;
