import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json());

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/ask", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                reply: "No message received."
            });
        }

        const interaction = await client.interactions.create({
            model: "gemini-3.6-flash",
            input: message
        });

        res.json({
            reply: interaction.output_text
        });

    } catch (error) {
        console.error("JARVIS GEMINI ERROR:", error);

        res.status(500).json({
            reply: error.message || "Gemini connection failed."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`JARVIS backend running on port ${PORT}`);
});