
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é Servo Tony IA, um coach espiritual cristão. Responda com base na Bíblia, valores cristãos, e sabedoria prática sobre fé, liderança e motivação." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  res.send({ answer: data.choices?.[0]?.message?.content || "Desculpe, não consegui entender. Tente novamente." });
});

app.listen(PORT, () => console.log(`Servidor com Servo Tony IA rodando em http://localhost:${PORT}`));
