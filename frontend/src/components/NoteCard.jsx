import { useEffect, useRef, useState, useContext } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils.js"; // Importation des utilitaires pour gérer le déplacement, la taille des éléments, etc.
import axiosInstance from "../api/axiosInstance"; // Instance axios pour les appels API
import Spinner from "../icons/Spinner.jsx"; // Composant de chargement
import DeleteButton from "./DeleteButton.jsx"; // Composant pour la suppression des notes
import { NoteContext } from "../context/NoteContext"; // Contexte des notes pour partager des états entre les composants

// Composant principal pour afficher et interagir avec une note individuelle
const NoteCard = ({ note }) => {
  const { setNotes } = useContext(NoteContext); // Accès au contexte pour mettre à jour les notes
  const body = bodyParser(note.body); // Parse le contenu du corps de la note
  const [position, setPosition] = useState(bodyParser(note.position)); // État pour stocker la position de la note sur l'écran
  const colors = bodyParser(note.colors); // Parse les couleurs associées à la note

  const [saving, setSaving] = useState(false); // État pour gérer l'affichage de l'icône de sauvegarde
  const keyUpTimer = useRef(null); // Référence pour timer qui gère les délais avant la sauvegarde du texte

  let mouseStartPos = { x: 0, y: 0 }; // Variable pour suivre la position initiale de la souris

  const cardRef = useRef(null); // Référence à l'élément de la carte pour le déplacer et ajuster le style
  const textAreaRef = useRef(null); // Référence à la zone de texte pour ajuster sa taille et son contenu

  useEffect(() => {
    autoGrow(textAreaRef); // Ajuste automatiquement la taille du textarea selon le contenu
    setZIndex(cardRef.current); // Définit l'ordre z-index pour afficher la carte au-dessus des autres quand elle est sélectionnée
  }, []);

  const { setSelectedNote } = useContext(NoteContext); // Fonction pour définir la note actuellement sélectionnée

  // Fonction appelée lorsque l'utilisateur clique et commence à déplacer la note
  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX; // Capture la position initiale de la souris (axe X)
    mouseStartPos.y = e.clientY; // Capture la position initiale de la souris (axe Y)

    document.addEventListener("mousemove", mouseMove); // Ajoute un écouteur pour suivre les mouvements de la souris
    document.addEventListener("mouseup", mouseUp); // Ajoute un écouteur pour stopper le suivi au relâchement de la souris

    setZIndex(cardRef.current); // Définit l'ordre d'affichage de la note lors du déplacement
    setSelectedNote(note); // Définit cette note comme la note actuellement déplacée
  };

  // Fonction appelée à chaque mouvement de la souris pour déplacer la note
  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX, // Calcule la distance parcourue par la souris sur l'axe X
      y: mouseStartPos.y - e.clientY, // Calcule la distance parcourue par la souris sur l'axe Y
    };

    mouseStartPos.x = e.clientX; // Met à jour la position actuelle de la souris
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir); // Calcule la nouvelle position de la note
    setPosition(newPosition); // Met à jour la position de la note dans l'état
    saveData("position", newPosition); // Sauvegarde la nouvelle position via l'API
  };

  // Fonction appelée lorsque l'utilisateur relâche la souris, arrêtant le déplacement
  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove); // Supprime l'écouteur de mouvement
    document.removeEventListener("mouseup", mouseUp); // Supprime l'écouteur de relâchement
  };

  // Fonction pour sauvegarder les données de la note (position, texte) dans la base de données
  const saveData = async (key, value) => {
    setSaving(true); // Active l'état de sauvegarde (affichage du spinner)

    const payload = {
      [key]: typeof value === "string" ? value : JSON.stringify(value), // Envoie les données à sauvegarder (position ou corps de texte)
    };

    try {
      await axiosInstance.patch(`/notes/${note._id}`, payload); // Requête PATCH pour mettre à jour la note sur le serveur
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données :", error); // Affiche une erreur si la sauvegarde échoue
    }

    setSaving(false); // Désactive l'état de sauvegarde après la requête
  };

  // Fonction déclenchée à chaque modification de texte dans le textarea
  const handleTextChange = (e) => {
    autoGrow(textAreaRef); // Ajuste la taille du textarea pour s'adapter au contenu
  };

  // Fonction appelée lors du relâchement des touches pour enregistrer automatiquement le texte
  const handleKeyUp = async () => {
    setSaving(true); // Active l'état de sauvegarde

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current); // Annule le timer précédent s'il existe
    }

    // Définit un délai avant de sauvegarder pour éviter des sauvegardes trop fréquentes
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value); // Sauvegarde le contenu du textarea
    }, 2000); // Délai de 2 secondes
  };

  return (
    <div
      ref={cardRef} // Référence pour manipuler la carte
      className="card"
      style={{
        backgroundColor: colors.colorBody || "#FFF", // Couleur de fond de la note
        left: `${position.x}px`, // Position de la note sur l'axe X
        top: `${position.y}px`, // Position de la note sur l'axe Y
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }} // Couleur de l'entête de la note
        onMouseDown={mouseDown} // Déclenche l'action de déplacement de la note
      >
        <DeleteButton noteId={note._id} />{" "}
        {/* Bouton de suppression de la note */}
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} /> {/* Spinner de sauvegarde */}
            <span
              translate="no"
              className="select-none"
              style={{ color: colors.colorText }}
            >
              Saving... {/* Indicateur visuel de sauvegarde */}
            </span>
          </div>
        )}
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef} // Référence pour manipuler le contenu du textarea
          onKeyUp={handleKeyUp} // Enregistre automatiquement après la frappe
          onInput={handleTextChange} // Ajuste la taille du textarea
          onFocus={() => {
            setZIndex(cardRef.current); // Place la carte au premier plan lors de l'édition
          }}
          style={{ color: colors.colorText }} // Style du texte
          defaultValue={body} // Texte initial de la note
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
