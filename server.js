import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini AI
const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Health check
app.get("/", (req, res) => {
    res.json({
        status: "online",
        system: "JARVIS AI SERVER"
    });
});

// JARVIS AI
app.post("/ask", async (req, res) => {
    try {
        const message = req.body?.message;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                reply: "No message received."
            });
        }

        const interaction = await client.interactions.create({
            model: "gemini-3.6-flash",
            input: message
        });

        const reply =
            interaction.output_text ||
            "I could not generate a response.";

        res.json({
            success: true,
            reply: reply
        });

    } catch (error) {
        console.error("JARVIS GEMINI ERROR:", error);

        res.status(500).json({
            success: false,
            reply: "Gemini connection failed."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`JARVIS backend running on port ${PORT}`);
});
