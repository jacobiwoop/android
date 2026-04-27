import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // À adapter selon l'IP IP locale pour mobile

class ChatService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);

      this.socket.on("connect", () => {});
    }
    return this.socket;
  }

  joinRoom(roomId) {
    if (this.socket) {
      this.socket.emit("join_room", roomId);
    }
  }

  sendMessage(roomId, message, senderId, senderName) {
    if (this.socket) {
      this.socket.emit("send_message", {
        roomId,
        message,
        senderId,
        senderName,
        timestamp: new Date().toISOString(),
      });
    }
  }

  onMessageReceived(callback) {
    if (this.socket) {
      this.socket.on("receive_message", callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const chatService = new ChatService();
