// Importation d'axios pour effectuer des requêtes HTTP
import axios from "axios";
// Importation de l'URL de base depuis les constantes définies
import { BASE_URL } from "./constants";

// Création d'une instance axios personnalisée
// Cette instance sera utilisée pour toutes les requêtes API avec les configurations par défaut
const axiosInstance = axios.create({
  baseURL: BASE_URL, // URL de base pour toutes les requêtes API
  timeout: 10000, // Temps maximum (en ms) avant qu'une requête ne soit annulée si elle ne répond pas
  headers: {
    "Content-Type": "application/json", // Spécifie que les données envoyées et reçues sont au format JSON
  },
});

// Intercepteur de requêtes
// Ce bloc de code est exécuté avant chaque requête envoyée via cette instance axios
axiosInstance.interceptors.request.use(
  (config) => {
    // Récupération du token d'accès stocké dans le localStorage
    const accessToken = localStorage.getItem("token");

    // Si un token est présent, il est ajouté aux en-têtes de la requête
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    // Retourne la configuration modifiée ou originale pour envoyer la requête
    return config;
  },
  // Gestion des erreurs lors de l'envoi des requêtes
  (error) => {
    // Si une erreur se produit, elle est rejetée pour être traitée ailleurs
    return Promise.reject(error);
  }
);

// Exportation de l'instance axios pour l'utiliser dans d'autres parties de l'application
export default axiosInstance;
