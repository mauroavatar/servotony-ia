const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GROQ_API_KEY = "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";

app.post("/api", async (req, res) => {
  const prompt = req.body.message;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192", // ou "mixtral-8x7b-32768"
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("Erro com Groq:", error.response?.data || error.message);
    res.status(500).json({ answer: "Desculpe, algo deu errado com a IA." });
  }
});

app.listen(3000, () => {
  console.log("Servidor com Groq rodando em http://localhost:3000");
});
