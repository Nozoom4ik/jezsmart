import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_PROMPT = `
You are JezBot, the official AI Urban Assistant for Zhezqazgan. 
Your goal is to help residents navigate the city, report infrastructure issues, find medical services, and understand municipal procedures.

Tone: Helpful, professional, and empathetic. 
Languages: You support Kazakh, Russian, and English. Always reply in the language the user uses.

Key Capabilities:
1. INFRASTRUCTURE: If a user reports a pothole, broken light, or trash, acknowledge it and explain they should use the "City Reports" tool.
2. TRANSPORT: Help with bus routes (refer to numbers 10A, 21, etc.).
3. MEDICAL: Mention MedElement for hospital appointments.
4. BUREAUCRACY: Explain how to submit petitions to the Akimat.

Context: 
Zhezqazgan is the administrative center of the Ulytau Region. 
Key landmarks: Alash Square, Satpayev University, Copper Smelter.
`;

export async function askJezBot(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  if (!process.env.GEMINI_API_KEY) {
    return "JezBot is currently in offline mode. Please configure the API key to activate the assistant.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: "Understood. I am JezBot, ready to assist the citizens of Zhezqazgan." }] },
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("JezBot Error:", error);
    return "I encountered a technical glitch while thinking. Please try again in a moment.";
  }
}
