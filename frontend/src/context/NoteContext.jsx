import { createContext, useState, useEffect } from "react";
import Spinner from "../icons/Spinner"; // Importation d'une icône Spinner pour l'indicateur de chargement
import axiosInstance from "../api/axiosInstance"; // Importation de l'instance Axios pour gérer les requêtes HTTP

// Création du contexte pour les notes
export const NoteContext = createContext();

/**
 * NotesProvider est un composant qui fournit les données liées aux notes à l'ensemble des composants enfants.
 * Il gère l'état des notes, le chargement, la note sélectionnée et permet de récupérer les notes depuis le backend.
 *
 * @param {Object} children - Les composants enfants qui auront accès aux données via le contexte NoteContext.
 */
const NotesProvider = ({ children }) => {
  // État pour indiquer si les notes sont en cours de chargement
  const [loading, setLoading] = useState(true);

  // État pour stocker les notes récupérées depuis le backend
  const [notes, setNotes] = useState([]);

  // État pour gérer la note actuellement sélectionnée
  const [selectedNote, setSelectedNote] = useState(null);

  /**
   * useEffect : Exécute la fonction `fetchNotes` pour récupérer les notes à chaque fois
   * que le composant est monté. Le tableau de dépendances vide [] signifie que cette
   * fonction ne s'exécutera qu'une seule fois, au premier rendu.
   */
  useEffect(() => {
    fetchNotes();
  }, []);

  /**
   * fetchNotes : Fonction pour récupérer les notes depuis l'API.
   * Elle envoie une requête GET à l'endpoint "/notes" pour obtenir les données des notes.
   * En cas de succès, elle met à jour l'état des notes. En cas d'erreur, elle affiche une erreur dans la console.
   * À la fin de la requête, l'indicateur de chargement `loading` est mis à false.
   */
  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      setNotes(response.data); // Mise à jour des notes avec les données récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des notes :", error);
    } finally {
      setLoading(false); // Désactiver l'indicateur de chargement, que la requête soit réussie ou non
    }
  };

  // Données qui seront partagées dans tout le contexte NoteContext
  const contextData = {
    notes, // Liste des notes
    setNotes, // Fonction pour mettre à jour la liste des notes
    selectedNote, // La note actuellement sélectionnée
    setSelectedNote, // Fonction pour définir une note sélectionnée
    fetchNotes, // Fonction pour récupérer les notes depuis l'API
  };

  /**
   * Retourne le contexte NoteContext.Provider pour que ses enfants puissent accéder
   * aux notes, aux fonctions de mise à jour et à la note sélectionnée.
   *
   * Si les notes sont encore en cours de chargement, un indicateur visuel (Spinner) est affiché.
   * Une fois les notes chargées, les enfants du composant seront rendus normalement.
   */
  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />{" "}
          {/* Indicateur de chargement pendant la récupération des notes */}
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};

export default NotesProvider;
