import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/ask", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                reply: "No message received."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",
            instructions:
                "You are JARVIS, a concise personal AI assistant. " +
                "Answer clearly and naturally. " +
                "The user's name is Nichal. " +
                "Do not claim to control the phone unless a real tool is connected.",
            input: message
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error("JARVIS AI ERROR:", error);

        res.status(500).json({
            reply: "AI connection failed."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`JARVIS backend running on port ${PORT}`);
});