import Trash from "../icons/Trash";
import axiosInstance from "../api/axiosInstance";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const DeleteButton = ({ noteId }) => {
  const { setNotes } = useContext(NoteContext);

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!noteId) {
      console.error("Note ID is undefined");
      return;
    }

    try {
      await axiosInstance.delete(`/notes/${noteId}`);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la note :", error);
    }
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
