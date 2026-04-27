export function ChatPage(users = []) {
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const conversationItems =
    users.length > 0
      ? users
          .map(
            (user, i) => `
        <div class="conversation-item p-4 flex items-center gap-4 hover:bg-zinc-50 cursor-pointer transition-colors border-b border-zinc-50"
             data-chat-id="${user.id}" data-name="${user.name}">
          <div class="relative">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
              ${getInitials(user.name)}
            </div>
            ${i === 0 ? '<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>' : ""}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center mb-1">
              <h3 class="font-bold text-zinc-900 truncate">${user.name}</h3>
            </div>
            <p class="text-sm text-zinc-400 truncate italic">Commencer une conversation</p>
          </div>
        </div>
      `,
          )
          .join("")
      : `
        <div class="flex flex-col items-center justify-center h-full py-20 text-zinc-400">
          <span class="material-symbols-outlined text-6xl mb-4">forum</span>
          <p class="font-bold text-lg">Aucun utilisateur disponible</p>
          <p class="text-sm mt-1">Invitez des amis à rejoindre LuminaZen !</p>
        </div>
      `;

  return `
    <div id="chat-wrapper" class="h-[calc(100vh-160px)]">
      <!-- Liste des conversations -->
      <div id="conversation-list" class="flex flex-col h-full bg-white transition-all">
        <div class="p-6 border-b border-zinc-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 class="text-2xl font-black">Messages</h2>
          <div class="p-2 bg-zinc-50 rounded-full text-zinc-400">
            <span class="material-symbols-outlined">search</span>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto">
          ${conversationItems}
        </div>
      </div>

      <!-- Vue de discussion (cachée par défaut) -->
      <div id="chat-view" class="hidden flex flex-col h-full bg-zinc-50 transition-all">
        <div class="flex-none p-4 bg-white border-b border-zinc-100 flex items-center gap-3">
          <button id="back-to-list" class="p-2 -ml-2 text-zinc-400 hover:text-zinc-900 transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <div id="chat-header-avatar" class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold"></div>
          <div>
            <h2 id="chat-header-name" class="font-bold text-zinc-900"></h2>
            <p class="text-[10px] text-green-500 font-bold uppercase tracking-wider">En ligne</p>
          </div>
        </div>

        <div id="messages-container" class="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
          <!-- Messages here -->
        </div>

        <div class="flex-none p-4 bg-white border-t border-zinc-100">
          <div class="flex gap-2 items-center bg-zinc-50 p-1 rounded-2xl border border-zinc-100 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <input id="chat-input" type="text" class="flex-1 p-3 bg-transparent outline-none text-sm" placeholder="Écrivez votre message...">
            <button id="send-btn" class="bg-primary text-on-primary w-11 h-11 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all">
              <span class="material-symbols-outlined font-bold text-xl">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
