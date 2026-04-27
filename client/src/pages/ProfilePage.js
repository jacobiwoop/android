export function ProfilePage() {
  const token = localStorage.getItem("token");

  if (!token) {
    return `
      <div id="auth-container" class="mt-12 max-w-md mx-auto p-6 bg-white rounded-3xl shadow-sm border border-zinc-100">
        <div id="login-form">
          <h2 class="text-2xl font-black mb-2 text-primary">Connexion</h2>
          <p class="text-zinc-500 text-sm mb-6">Connectez-vous pour gérer vos annonces</p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-widest">Email</label>
              <input id="login-email" type="email" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="votre@email.com">
            </div>
            <div>
              <label class="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-widest">Mot de passe</label>
              <input id="login-password" type="password" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="••••••••">
            </div>
            <button id="login-btn" class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-tertiary transition-all active:scale-95">
              Se connecter
            </button>
            <p class="text-center text-sm text-zinc-500 mt-4">Pas de compte ? <button id="show-register" class="text-primary font-bold hover:underline">Inscrivez-vous</button></p>
          </div>
        </div>

        <div id="register-form" class="hidden">
          <h2 class="text-2xl font-black mb-2 text-secondary">Inscription</h2>
          <p class="text-zinc-500 text-sm mb-6">Créez votre compte Byzo</p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-widest">Nom complet</label>
              <input id="reg-name" type="text" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary outline-none" placeholder="Jean Dupont">
            </div>
            <div>
              <label class="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-widest">Email</label>
              <input id="reg-email" type="email" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary outline-none" placeholder="votre@email.com">
            </div>
            <div>
              <label class="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-widest">Mot de passe</label>
              <input id="reg-password" type="password" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary outline-none" placeholder="••••••••">
            </div>
            <button id="register-btn" class="w-full py-4 bg-secondary text-on-secondary rounded-xl font-bold shadow-lg shadow-secondary/20 hover:opacity-90 transition-all active:scale-90">
              Créer mon compte
            </button>
            <p class="text-center text-sm text-zinc-500 mt-4">Déjà un compte ? <button id="show-login" class="text-secondary font-bold hover:underline">Connectez-vous</button></p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="mt-8 flex flex-col items-center">
      <div class="w-24 h-24 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-500 mb-4 border-4 border-white shadow-md">
        <span class="material-symbols-outlined text-5xl">person</span>
      </div>
      <h2 class="text-xl font-bold text-on-background">Mon Profile</h2>
      <p class="text-sm text-zinc-500 mb-8">Membre certifié Lumina</p>

      <div id="profile-menu" class="w-full space-y-3">
        <button id="view-my-ads" class="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 hover:border-primary/20 transition-all group">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined">inventory_2</span>
            </div>
            <span class="font-bold text-zinc-700">Mes Annonces</span>
          </div>
          <span class="material-symbols-outlined text-zinc-300">chevron_right</span>
        </button>
        <button id="view-favorites" class="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 hover:border-primary/20 transition-all group">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined">favorite</span>
            </div>
            <span class="font-bold text-zinc-700">Mes Favoris</span>
          </div>
          <span class="material-symbols-outlined text-zinc-300">chevron_right</span>
        </button>
      </div>

      <div id="personal-content" class="w-full mt-6 hidden">
        <div class="flex items-center gap-2 mb-6">
           <button id="back-to-menu" class="p-2 hover:bg-zinc-100 rounded-full transition-colors">
             <span class="material-symbols-outlined">arrow_back</span>
           </button>
           <h3 id="personal-title" class="font-black text-xl">Mes Annonces</h3>
        </div>
        <div id="personal-grid" class="grid grid-cols-2 gap-4">
          <!-- Dynamically populated -->
        </div>
      </div>

      <button id="logout-btn" class="w-full flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-zinc-400 hover:bg-error/5 hover:text-error hover:border-error/20 transition-all mt-6">
        <div class="flex items-center gap-4">
          <span class="material-symbols-outlined">logout</span>
          <span class="font-bold">Déconnexion</span>
        </div>
      </button>
    </div>
  `;
}
