import "./style.css";
import { navigate } from "./router.js";
import { apiService } from "./services/ApiService.js";

// Initialisation de l'application au chargement
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Byzo Marketplace - Initialisation...");

  // Vérification globale de la session au démarrage
  const token = localStorage.getItem("token");
  if (token) {
    const isValid = await apiService.verifyToken();
    if (!isValid) {
      console.log("Session expirée ou invalide. Nettoyage...");
      localStorage.removeItem("token");
    } else {
      console.log("Session active confirmée.");
    }
  }

  // Navigation vers la page d'accueil par défaut
  navigate("home");
});
