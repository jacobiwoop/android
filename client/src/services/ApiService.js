// Detect if we're running in Capacitor native app
// URL de l'API - injectable via variable d'environnement Vite (GitHub Actions)
const isNative = window.Capacitor?.isNativePlatform?.() ?? false;
const API_BASE_URL = isNative
  ? "http://10.118.59.133:3000/api"
  : "http://localhost:3000/api";

class ApiService {
  // Helper pour récupérer les headers d'authentification
  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async verifyToken() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error);
      return false;
    }
  }

  async getAds() {
    try {
      const response = await fetch(`${API_BASE_URL}/ads`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des annonces");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createAd(adData) {
    try {
      const response = await fetch(`${API_BASE_URL}/ads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(), // Ajout sécurisé du token
        },
        body: JSON.stringify(adData),
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Non autorisé. Veuillez vous reconnecter.");
        }
        throw new Error("Erreur lors de la création de l'annonce");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      alert(error.message); // Retour d'erreur plus explicite
      return null;
    }
  }

  // Auth methods
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      return { error: "Connexion échouée" };
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      return { error: "Inscription échouée" };
    }
  }
}

export const apiService = new ApiService();
