import { Header } from "./components/Header.js";
import { BottomNav } from "./components/BottomNav.js";
import { HomePage } from "./pages/HomePage.js";
import { PostPage } from "./pages/PostPage.js";
import { ChatPage } from "./pages/ChatPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { chatService } from "./services/ChatService.js";
import { apiService } from "./services/ApiService.js";

const appElement = document.querySelector("#app");

const routes = {
  home: HomePage,
  post: PostPage,
  chat: ChatPage,
  profile: ProfilePage,
};

export async function navigate(route) {
  const protectedRoutes = ["post", "chat"];

  // Redirection si l'utilisateur tente d'accéder à une route protégée
  if (protectedRoutes.includes(route)) {
    const isValidToken = await apiService.verifyToken();
    if (!isValidToken) {
      // Nettoyage au cas où le token est expiré/invalide
      localStorage.removeItem("token");
      alert(
        "Votre session a expiré ou vous devez être connecté pour accéder à cette page.",
      );
      return navigate("profile");
    }
  }

  const pageRenderer = routes[route] || routes.home;

  let extraData = null;
  if (route === "home" || !route) {
    extraData = await apiService.getAds();
  } else if (route === "chat") {
    extraData = await apiService.getUsers();
  }

  // Rendu de la structure globale avec transition
  appElement.innerHTML = `
    ${Header()}
    <main class="max-w-[1280px] mx-auto px-4 pb-24 animate-in fade-in duration-500">
      ${pageRenderer(extraData)}
    </main>
    ${BottomNav(route)}
  `;

  // Réattacher les événements après le rendu
  attachEventListeners();
}

import { NativeService } from "./services/NativeService.js";

function attachEventListeners() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const route = e.currentTarget.getAttribute("data-link");
      navigate(route);
    });
  });

  // Logique du bouton photo (via input file web)
  const photoInput = document.querySelector("#photo-input");
  if (photoInput) {
    photoInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files).slice(0, 5);
      const grid = document.querySelector("#photo-grid");
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const imgContainer = document.createElement("div");
          imgContainer.className =
            "aspect-square rounded-xl overflow-hidden shadow-sm relative";
          imgContainer.innerHTML = `
            <img src="${ev.target.result}" class="w-full h-full object-cover" data-photo>
            <button class="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 leading-none remove-photo">
              <span class="material-symbols-outlined text-xs">close</span>
            </button>
          `;
          grid.appendChild(imgContainer);
          imgContainer
            .querySelector(".remove-photo")
            .addEventListener("click", () => imgContainer.remove());
        };
        reader.readAsDataURL(file);
      });
    });
  }

  // Logique de géolocalisation
  const locationBtn = document.querySelector("#detect-location");
  if (locationBtn) {
    locationBtn.addEventListener("click", async () => {
      locationBtn.classList.add("animate-spin");
      const coords = await NativeService.getCurrentLocation();
      locationBtn.classList.remove("animate-spin");

      if (coords) {
        const input = document.querySelector("#location-input");
        input.value = `${coords.coords.latitude.toFixed(4)}, ${coords.coords.longitude.toFixed(4)}`;
        await NativeService.vibrate();
      }
    });
  }

  // FAB Button Navigation
  const fabPost = document.querySelector("#fab-post");
  if (fabPost) {
    fabPost.addEventListener("click", () => navigate("post"));
  }

  // Filtrage par Catégorie
  document.querySelectorAll(".category-item").forEach((item) => {
    item.addEventListener("click", async () => {
      const category = item.getAttribute("data-category");
      const ads = await apiService.getAds();
      const filtered = ads.filter((ad) => ad.category === category);
      navigate("home", filtered);
    });
  });

  // Recherche
  const searchInput = document.querySelector(
    'input[placeholder="Find electronics, cars, houses..."]',
  );
  if (searchInput) {
    searchInput.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.toLowerCase();
        const ads = await apiService.getAds();
        const filtered = ads.filter(
          (ad) =>
            ad.title.toLowerCase().includes(query) ||
            ad.description.toLowerCase().includes(query),
        );
        navigate("home", filtered);
      }
    });
  }

  // Logique de publication d'annonce
  const publishBtn = document.querySelector("#publish-ad");
  if (publishBtn) {
    publishBtn.addEventListener("click", async () => {
      const title = document.querySelector("#ad-title").value;
      const price = parseFloat(document.querySelector("#ad-price").value);
      const location = document.querySelector("#location-input").value;
      const description = document.querySelector("#ad-description").value;
      const category = document.querySelector("#ad-category").value;
      const images = Array.from(
        document.querySelectorAll("#photo-grid img"),
      ).map((img) => img.src);

      if (!title || !price) {
        alert("Veuillez remplir au moins le titre et le prix");
        return;
      }

      publishBtn.disabled = true;
      publishBtn.innerHTML = `<span class="animate-spin material-symbols-outlined">sync</span> Publication...`;

      const newAd = await apiService.createAd({
        title,
        price,
        location,
        description,
        category,
        image:
          images[0] ||
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400", // Fallback image
      });

      if (newAd) {
        await NativeService.vibrate();
        navigate("home");
      } else {
        alert("Erreur lors de la publication");
        publishBtn.disabled = false;
        publishBtn.textContent = "Publier l'annonce";
      }
    });
  }

  // Toggles Connexion / Inscription
  const showRegister = document.querySelector("#show-register");
  const showLogin = document.querySelector("#show-login");
  const loginForm = document.querySelector("#login-form");
  const registerForm = document.querySelector("#register-form");

  if (showRegister && showLogin) {
    showRegister.addEventListener("click", () => {
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
    });
    showLogin.addEventListener("click", () => {
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });
  }

  // Logique d'authentification
  const loginBtn = document.querySelector("#login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.querySelector("#login-email").value;
      const password = document.querySelector("#login-password").value;

      loginBtn.disabled = true;
      loginBtn.innerHTML = `<span class="animate-spin material-symbols-outlined">sync</span>`;

      const result = await apiService.login({ email, password });
      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("profile");
      } else {
        alert("Identifiants incorrects");
        loginBtn.disabled = false;
        loginBtn.textContent = "Se connecter";
      }
    });
  }

  const registerBtn = document.querySelector("#register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", async () => {
      const name = document.querySelector("#reg-name").value;
      const email = document.querySelector("#reg-email").value;
      const password = document.querySelector("#reg-password").value;

      if (!name || !email || !password) {
        alert("Veuillez remplir tous les champs");
        return;
      }

      registerBtn.disabled = true;
      registerBtn.textContent = "Création...";

      const result = await apiService.register({ name, email, password });
      if (result.id) {
        alert("Compte créé avec succès ! Connectez-vous.");
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
      } else {
        alert("Erreur lors de l'inscription");
        registerBtn.disabled = false;
        registerBtn.textContent = "Créer mon compte";
      }
    });
  }

  const logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      navigate("profile");
    });
  }

  // Mes Annonces / Favoris
  const viewMyAdsBtn = document.querySelector("#view-my-ads");
  const viewFavBtn = document.querySelector("#view-favorites");
  const backToMenuBtn = document.querySelector("#back-to-menu");
  const profileMenu = document.querySelector("#profile-menu");
  const personalContent = document.querySelector("#personal-content");
  const personalGrid = document.querySelector("#personal-grid");
  const personalTitle = document.querySelector("#personal-title");

  if (viewMyAdsBtn && viewFavBtn && backToMenuBtn) {
    const showPersonalView = async (title, filterFn) => {
      personalTitle.textContent = title;
      profileMenu.classList.add("hidden");
      personalContent.classList.remove("hidden");
      personalGrid.innerHTML = `<div class="col-span-2 py-10 flex justify-center"><div class="animate-spin material-symbols-outlined text-primary text-4xl">sync</div></div>`;

      const allAds = await apiService.getAds();
      // Pour simuler "Mes Annonces", on pourrait comparer avec l'ID utilisateur du token
      // Pour l'instant on filtre par auteur ou on montre tout si c'est favoris
      const filtered = allAds.filter(filterFn);

      if (filtered.length > 0) {
        personalGrid.innerHTML = filtered.map((ad) => AdCard(ad)).join("");
      } else {
        personalGrid.innerHTML = `<div class="col-span-2 text-center py-10 text-zinc-400">Aucun résultat trouvé</div>`;
      }
    };

    viewMyAdsBtn.addEventListener("click", () => {
      // Simulation: On montre les 2 premières annonces comme "mes annonces"
      showPersonalView("Mes Annonces", (ad, index) => index < 2);
    });

    viewFavBtn.addEventListener("click", () => {
      // Simulation: On montre les annonces avec index impair
      showPersonalView("Mes Favoris", (ad, index) => index % 2 !== 0);
    });

    backToMenuBtn.addEventListener("click", () => {
      personalContent.classList.add("hidden");
      profileMenu.classList.remove("hidden");
    });
  }

  // Logique de chat
  const chatInput = document.querySelector("#chat-input");
  const sendBtn = document.querySelector("#send-btn");
  const messagesContainer = document.querySelector("#messages-container");
  const convList = document.querySelector("#conversation-list");
  const chatView = document.querySelector("#chat-view");
  const backBtn = document.querySelector("#back-to-list");

  // Interaction avec la liste des conversations
  document.querySelectorAll(".conversation-item").forEach((item) => {
    item.addEventListener("click", () => {
      const name = item.getAttribute("data-name");
      const chatId = item.getAttribute("data-chat-id");

      // Mise à jour du header de chat
      document.querySelector("#chat-header-name").textContent = name;
      document.querySelector("#chat-header-avatar").textContent = name
        .split(" ")
        .map((n) => n[0])
        .join("");

      // Afficher la vue chat
      convList.classList.add("hidden");
      chatView.classList.remove("hidden");

      // Connexion socket
      const roomId = `chat-${chatId}`;
      chatService.connect();
      chatService.joinRoom(roomId);
    });
  });

  // Retour à la liste
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      chatView.classList.add("hidden");
      convList.classList.remove("hidden");
    });
  }

  if (chatInput && sendBtn) {
    const appendMessage = (data, isMe) => {
      const msgDiv = document.createElement("div");
      msgDiv.className = `flex ${isMe ? "justify-end" : "justify-start"}`;
      msgDiv.innerHTML = `
        <div class="max-w-[80%] p-3 rounded-2xl ${
          isMe
            ? "bg-primary text-on-primary rounded-tr-none"
            : "bg-white border border-zinc-200 rounded-tl-none shadow-sm"
        }">
          <p class="text-sm">${data.message}</p>
          <p class="${
            isMe ? "text-white/60" : "text-zinc-400"
          } text-[10px] mt-1">${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
        </div>
      `;
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const handleSendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        chatService.sendMessage("global-chat", message, "me", "Moi");
        appendMessage({ message }, true);
        chatInput.value = "";
      }
    };

    sendBtn.addEventListener("click", handleSendMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSendMessage();
    });

    chatService.onMessageReceived((data) => {
      if (data.senderId !== "me") {
        appendMessage(data, false);
      }
    });
  }
}
