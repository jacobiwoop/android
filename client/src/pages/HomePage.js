import { CategoryBar } from "../components/CategoryBar.js";
import { AdCard } from "../components/AdCard.js";

export function HomePage(ads = []) {
  const latestAds =
    ads.length > 0
      ? ads
      : [
          // Fallback data if DB is empty
          {
            id: 1,
            title: 'Pro Laptop 16"',
            price: 1200,
            category: "Electronics",
            location: "Montreal, QC",
            image:
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400",
          },
        ];

  return `
    <!-- Mobile Search Bar -->
    <div class="mt-4 md:hidden">
      <div class="relative">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
        <input class="w-full bg-white border border-outline-variant rounded-xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Find electronics, cars, houses..." type="text" />
      </div>
    </div>

    <!-- Categories -->
    ${CategoryBar()}

    <!-- Latest Ads -->
    <section class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-on-background">Latest Ads</h2>
        <button class="text-primary font-bold text-sm hover:underline">View All</button>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        ${latestAds.map((ad) => AdCard(ad)).join("")}
      </div>
    </section>

    <!-- FAB for mobile -->
    <button id="fab-post" class="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:bg-tertiary transition-all active:scale-90 md:bottom-12 z-40">
      <span class="material-symbols-outlined text-2xl">add</span>
    </button>
  `;
}
