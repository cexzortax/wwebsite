const chatToggle = document.querySelector("#chat-toggle");
const chatPanel = document.querySelector("#chat-panel");
const chatClose = document.querySelector("#chat-close");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");

function setChatOpen(isOpen) {
  chatPanel.hidden = !isOpen;
  chatToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    chatInput.focus();
  } else {
    chatToggle.focus();
  }
}

function addMessage(text, sender) {
  const message = document.createElement("p");
  message.className = `chat-bubble ${sender}-message`;
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getReply(message) {
  const question = message.toLocaleLowerCase("id-ID");

  if (/\b(halo|hai|hey|hello|hi)\b/.test(question)) {
    return "Hai juga! Senang kamu mampir. Mau tahu apa tentang Miyabi?";
  }
  if (question.includes("siapa") || question.includes("nama")) {
    return "Namanya Miyabi Hoshimi. Dia adalah Kepala Seksi Operasi Khusus Hollow 6.";
  }
  if (question.includes("jabatan") || question.includes("tugas")) {
    return "Di halaman ini, Miyabi disebut sebagai Kepala Seksi Operasi Khusus Hollow 6.";
  }
  if (question.includes("void hunter")) {
    return "Void Hunter adalah sebutan untuk para pemburu Void. Miyabi adalah salah satu dari mereka.";
  }
  if (question.includes("terima kasih") || question.includes("makasih")) {
    return "Sama-sama! Ada hal lain yang ingin kamu tanyakan?";
  }

  if (question.includes("my bini") || question.includes("istri")) {
    return "gausah mengada ngada,ini istri developernya, bukan istri kamu.";
  }
  
  return "Aku belum punya informasi itu. Coba tanyakan nama, jabatan, atau sebutan Void Hunter Miyabi.";
}

function sendMessage(text) {
  const message = text.trim();
  if (!message) return;

  addMessage(message, "user");
  addMessage(getReply(message), "bot");
}

chatToggle.addEventListener("click", () => {
  setChatOpen(chatPanel.hidden);
});

chatClose.addEventListener("click", () => setChatOpen(false));

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(chatInput.value);
  chatInput.value = "";
  chatInput.focus();
});

document.querySelectorAll(".quick-questions button").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.question));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatPanel.hidden) {
    setChatOpen(false);
  }
});
