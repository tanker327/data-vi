import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

const anthropic = new Anthropic({
    apiKey:
        process.env.ANTHROPIC_API_KEY,
    timeout: 15 * 60 * 1000, // 15 minutes timeout
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/llm", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        console.log("Sending request to Anthropic SDK with prompt:", prompt);

        const msg = await anthropic.beta.messages.create({
            model: "claude-3-7-sonnet-20250219",
            max_tokens: 128000,
            temperature: 1,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: prompt,
                        },
                    ],
                },
            ],
            betas: ["output-128k-2025-02-19"],
        });

        console.log("Anthropic SDK response:", msg);

        res.json({
            content: msg.content[0]?.text || "No response",
            model: msg.model,
            usage: msg.usage
                ? {
                      input_tokens: msg.usage.input_tokens,
                      output_tokens: msg.usage.output_tokens,
                  }
                : undefined,
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
