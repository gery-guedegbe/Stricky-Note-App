import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Utilisé pour la navigation entre les pages
import NoteCard from "../components/NoteCard"; // Composant pour afficher une carte de note
import axiosInstance from "../api/axiosInstance"; // Instance Axios configurée pour les appels API
import { NoteContext } from "../context/NoteContext"; // Contexte pour la gestion des notes
import { AuthContext } from "../context/AuthContext"; // Contexte pour la gestion de l'authentification
import Controls from "../components/Controls"; // Composant pour les contrôles additionnels

/**
 * NotesPage est la page qui affiche toutes les notes d'un utilisateur.
 * Elle utilise le contexte pour récupérer les notes et gère l'authentification.
 */
const NotesPage = () => {
  // Récupération des notes et fonctions de mise à jour à partir du contexte
  const { notes, setNotes, setSelectedNote } = useContext(NoteContext);
  // Vérification de l'état d'authentification à partir du contexte AuthContext
  const { authenticated } = useContext(AuthContext);
  // État pour gérer les erreurs éventuelles lors de la récupération des notes
  const [error, setError] = useState(null);
  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  /**
   * useEffect : redirige l'utilisateur vers la page de connexion si
   * il n'est pas authentifié
   */
  useEffect(() => {
    if (!authenticated) {
      navigate("/login"); // Redirection vers la page de connexion
    }
  }, [authenticated, navigate]);

  /**
   * fetchNotes : Fonction asynchrone pour récupérer les notes de l'utilisateur via une API
   * et les stocker dans le contexte. En cas d'échec, elle stocke l'erreur dans l'état.
   */
  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes"); // Appel API pour obtenir les notes
      setNotes(response.data); // Mise à jour du contexte avec les notes récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des notes :", error);
      setError("Erreur lors de la récupération des notes."); // Stockage de l'erreur dans l'état
    }
  };

  /**
   * useEffect : Exécute fetchNotes lors du chargement initial de la page
   */
  useEffect(() => {
    fetchNotes(); // Récupère les notes à l'ouverture de la page
  }, []);

  /**
   * handleUpdate : Fonction appelée pour mettre à jour la liste des notes après suppression.
   * @param {string} deletedNoteId - L'ID de la note qui a été supprimée.
   */
  const handleUpdate = (deletedNoteId) => {
    // Filtrer les notes pour retirer celle qui a été supprimée
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note._id !== deletedNoteId)
    );
  };

  return (
    <div className="w-full min-h-screen">
      {/* Affichage d'un message si aucune note n'est disponible et pas d'erreur */}
      {notes.length === 0 && !error ? (
        <div className="w-full h-full flex items-center justify-center">
          {error ? (
            // Affichage de l'erreur si elle est présente
            <p className="text-red-500">{error}</p>
          ) : (
            // Message affiché s'il n'y a aucune note
            <p className="text-gray-500 font-semibold text-2xl mt-40">
              Aucune note à afficher.
            </p>
          )}
        </div>
      ) : (
        // Affichage des cartes de notes récupérées via NoteCard
        notes.map((note) => (
          <NoteCard
            key={note._id} // Utilisation de l'ID de la note comme clé unique
            note={note} // Passe la note en tant que prop au composant NoteCard
            onClick={() => setSelectedNote(note)} // Définit la note sélectionnée
            onUpdate={handleUpdate} // Passe la fonction de mise à jour en cas de suppression
          />
        ))
      )}

      {/* Composant Controls pour les contrôles additionnels */}
      <Controls />
    </div>
  );
};

export default NotesPage;
