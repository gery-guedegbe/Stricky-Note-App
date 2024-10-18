import { createContext, useState, useEffect } from "react";

// Création du contexte d'authentification pour toute l'application
export const AuthContext = createContext();

/**
 * AuthProvider est un composant qui fournit le contexte d'authentification à ses enfants.
 * Il gère l'état de l'authentification à l'aide du hook `useState` et utilise `useEffect`
 * pour vérifier la présence d'un token dans `localStorage` afin de déterminer
 * si l'utilisateur est authentifié ou non.
 *
 * @param {Object} children - Composants enfants qui auront accès au contexte AuthContext.
 */
const AuthProvider = ({ children }) => {
  // État pour suivre si l'utilisateur est authentifié
  const [authenticated, setAuthenticated] = useState(false);

  /**
   * useEffect : Vérifie s'il y a un token dans le localStorage lorsque le composant est monté.
   * Si un token est présent, il définit `authenticated` sur true, ce qui signifie que
   * l'utilisateur est connecté.
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true); // L'utilisateur est authentifié s'il y a un token
    }
  }, []);

  // Données qui seront partagées à tous les composants consommateurs de ce contexte
  const contextData = { authenticated, setAuthenticated };

  /**
   * Retourne le contexte AuthContext.Provider pour que ses enfants puissent accéder aux
   * informations d'authentification (authenticated, setAuthenticated).
   */
  return (
    <AuthContext.Provider value={contextData}>
      {children} {/* Rendu des composants enfants */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
