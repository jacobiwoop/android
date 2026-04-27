export function CategoryBar() {
  const categories = [
    { name: "Electronics", icon: "devices" },
    { name: "Vehicles", icon: "directions_car" },
    { name: "Property", icon: "home_work" },
    { name: "Jobs", icon: "work" },
    { name: "Furniture", icon: "chair" },
    { name: "Fashion", icon: "apparel" },
  ];

  return `
    <section class="mt-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-on-background">Categories</h2>
        <button class="text-primary font-bold text-sm hover:underline">See All</button>
      </div>
      <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        ${categories
          .map(
            (cat) => `
          <div class="flex-none flex flex-col items-center gap-2 group cursor-pointer category-item" data-category="${cat.name}">
            <div class="w-16 h-16 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
              <span class="material-symbols-outlined text-2xl">${cat.icon}</span>
            </div>
            <span class="text-xs font-bold text-zinc-600">${cat.name}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>
  `;
}
