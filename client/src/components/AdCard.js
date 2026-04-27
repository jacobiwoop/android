export function AdCard(ad) {
  return `
    <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-transparent hover:border-tertiary-container hover:shadow-md transition-all group cursor-pointer" data-id="${ad.id}">
      <div class="aspect-[4/3] relative overflow-hidden">
        <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${ad.image}" alt="${ad.title}" />
        <button class="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors">
          <span class="material-symbols-outlined text-lg">favorite</span>
        </button>
      </div>
      <div class="p-3">
        <span class="text-secondary font-bold text-[10px] uppercase tracking-wider">${ad.category}</span>
        <h3 class="text-sm font-semibold mt-1 text-on-background line-clamp-1">${ad.title}</h3>
        <p class="font-bold text-secondary mt-1 text-base">$${ad.price.toLocaleString()}</p>
        <div class="flex items-center gap-1 mt-2 text-zinc-400">
          <span class="material-symbols-outlined text-xs">location_on</span>
          <span class="text-[10px]">${ad.location}</span>
        </div>
      </div>
    </div>
  `;
}
