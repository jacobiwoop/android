export function BottomNav(activePage = "home") {
  const getActiveClass = (page) =>
    activePage === page
      ? "text-green-700 dark:text-green-400 bg-green-50/50 dark:bg-green-900/20 px-4"
      : "text-zinc-400";
  const getIconFill = (page) => (activePage === page ? "'FILL' 1" : "'FILL' 0");

  return `
    <nav class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] z-50">
      <a class="flex flex-col items-center justify-center rounded-xl py-1 transition-all ${getActiveClass("home")}" href="#" data-link="home">
        <span class="material-symbols-outlined" style="font-variation-settings: ${getIconFill("home")}">home</span>
        <span class="text-[11px] font-medium uppercase tracking-wider mt-1">Home</span>
      </a>
      <a class="flex flex-col items-center justify-center rounded-xl py-1 transition-all ${getActiveClass("post")}" href="#" data-link="post">
        <span class="material-symbols-outlined" style="font-variation-settings: ${getIconFill("post")}">add_box</span>
        <span class="text-[11px] font-medium uppercase tracking-wider mt-1">Post Ad</span>
      </a>
      <a class="flex flex-col items-center justify-center rounded-xl py-1 transition-all ${getActiveClass("chat")}" href="#" data-link="chat">
        <span class="material-symbols-outlined" style="font-variation-settings: ${getIconFill("chat")}">chat_bubble</span>
        <span class="text-[11px] font-medium uppercase tracking-wider mt-1">Inbox</span>
      </a>
      <a class="flex flex-col items-center justify-center rounded-xl py-1 transition-all ${getActiveClass("profile")}" href="#" data-link="profile">
        <span class="material-symbols-outlined" style="font-variation-settings: ${getIconFill("profile")}">person</span>
        <span class="text-[11px] font-medium uppercase tracking-wider mt-1">Profile</span>
      </a>
    </nav>
  `;
}
