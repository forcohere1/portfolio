// File: /pages/api/groq/index.js
import { reqGroqAI } from "../../../lib/utils/groq";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Handle unsupported methods
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  try {
    // Parse the request body (assuming content-type is application/json)
    const data = req.body;

    // Ensure the body was received correctly
    if (!data || !data.content) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Fetch response from Groq AI
    const chatCompletion = await reqGroqAI(data.content);

    // Send the AI's response back to the client
    res.status(200).json({
      content: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    // Log error to server console
    console.error(error);

    // Send error response
    res.status(500).json({ message: "Internal Server Error" });
  }
}
