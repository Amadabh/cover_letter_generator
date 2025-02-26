import "dotenv/config"; // Correct way to load .env in ES Modules
import Groq from "groq-sdk";

// console.log("API Key:", process.env.GROQ_API_KEY);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
    const start = Date.now();
    const chatCompletion = await getGroqChatCompletion();

    console.log(chatCompletion.choices[0]?.message?.content || "");
    
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
}

export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Explain the importance of fast language models",
            },
        ],
        model: "llama-3.3-70b-versatile",
    });
}

main
