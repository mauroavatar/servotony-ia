
document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = "";

  appendMessage("bot", "Pensando...");

  const response = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text })
  });
  const data = await response.json();
  const botMessages = document.querySelectorAll(".bot");
  botMessages[botMessages.length - 1].textContent = data.answer;
});

function appendMessage(sender, text) {
  const box = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = "message " + sender;
  msg.textContent = text;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}
