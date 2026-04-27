export function Header() {
  return `
    <header class="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 shadow-sm dark:shadow-none docked full-width top-0 mb-4 sticky z-40">
      <div class="flex items-center justify-between px-4 h-16 w-full max-w-[1280px] mx-auto">
        <div class="flex items-center gap-4">
          <button class="text-green-700 dark:text-green-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors active:opacity-70 p-2 rounded-full">
            <span class="material-symbols-outlined">menu</span>
          </button>
          <h1 class="text-xl font-bold text-green-700 dark:text-green-500 font-sans tracking-tight">Marketplace</h1>
        </div>
        <div class="flex-1 max-w-xl mx-8 hidden md:block">
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input class="w-full bg-surface-container-low border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" placeholder="Search for anything..." type="text" />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="md:hidden text-green-700 dark:text-green-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors active:opacity-70 p-2 rounded-full">
            <span class="material-symbols-outlined">search</span>
          </button>
          <button class="text-green-700 dark:text-green-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors active:opacity-70 p-2 rounded-full">
            <span class="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </div>
    </header>
  `;
}
