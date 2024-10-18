import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import axiosInstance from "../api/axiosInstance";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { useRef } from "react";

const AddButton = () => {
  const { fetchNotes } = useContext(NoteContext);
  const startingPos = useRef(10);

  const addNote = async () => {
    const payload = {
      body: "Nouvelle note Ajoutée !",
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
    };

    startingPos.current += 10;

    try {
      await axiosInstance.post("/notes", payload);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
