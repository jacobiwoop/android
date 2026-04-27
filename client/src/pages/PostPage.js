export function PostPage() {
  return `
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-6">Publier une annonce</h2>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-6">

        <!-- Photos -->
        <div>
          <label class="block text-sm font-bold text-zinc-700 mb-2">Photos (Jusqu'à 5)</label>
          <div class="grid grid-cols-3 gap-3" id="photo-grid">
            <label class="aspect-square rounded-xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400 hover:border-primary hover:text-primary transition-all cursor-pointer">
              <span class="material-symbols-outlined text-3xl">add_a_photo</span>
              <span class="text-[10px] font-bold mt-1 uppercase">Ajouter</span>
              <input id="photo-input" type="file" accept="image/*" multiple class="hidden">
            </label>
          </div>
        </div>

        <!-- Titre -->
        <div>
          <label class="block text-sm font-bold text-zinc-700 mb-2">Titre de l'annonce</label>
          <input id="ad-title" type="text" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Qu'est-ce que vous vendez ?">
        </div>

        <!-- Prix + Localisation -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold text-zinc-700 mb-2">Prix ($)</label>
            <input id="ad-price" type="number" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="0.00">
          </div>
          <div>
            <label class="block text-sm font-bold text-zinc-700 mb-2">Localisation</label>
            <div class="relative">
              <input id="location-input" type="text" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all pr-12" placeholder="Ville ou Code Postal">
              <button id="detect-location" class="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:bg-primary-container p-2 rounded-full transition-colors">
                <span class="material-symbols-outlined">my_location</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Catégorie -->
        <div>
          <label class="block text-sm font-bold text-zinc-700 mb-2">Catégorie</label>
          <select id="ad-category" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer">
            <option value="Electronics">📱 Electronics</option>
            <option value="Vehicles">🚗 Vehicles</option>
            <option value="Property">🏠 Property</option>
            <option value="Jobs">💼 Jobs</option>
            <option value="Furniture">🪑 Furniture</option>
            <option value="Fashion">👕 Fashion</option>
          </select>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-bold text-zinc-700 mb-2">Description</label>
          <textarea id="ad-description" class="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all min-h-[120px]" placeholder="Dites-en plus sur votre objet..."></textarea>
        </div>

        <!-- Publish button -->
        <button id="publish-ad" class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-tertiary transition-all active:scale-95">
          Publier l'annonce
        </button>
      </div>
    </div>
  `;
}
