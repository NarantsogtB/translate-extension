import { GoogleGenAI } from '@google/genai';

let _client: GoogleGenAI | null = null;

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  if (!_client) {
    _client = new GoogleGenAI({ apiKey });
  }
  return _client;
}

export async function translateText(text: string, to: string): Promise<string> {
  try {
    const prompt = `
      Translate the following subtitle text to natural spoken Mongolian.
      Rules:
      - Translate ONLY the given text into "translatedText" field.
      - Output MUST be valid JSON.
      - Format: {"translatedText": "string"}
      - Keep technical terms unchanged.
      - No explanations.

      Subtitle text: "${text.replace(/"/g, '\\"')}"
    `;

    const result = await getClient().models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = result.text;
    if (!responseText) return text;

    try {
      const data = JSON.parse(responseText.trim());
      return data.translatedText || text;
    } catch (parseError) {
      console.error('JSON Parse Error. Raw response:', responseText);
      // Fallback: try to extract text manually if JSON fails but model returned something
      return text;
    }
  } catch (error) {
    console.error('Gemini translation error:', error);
    return text;
  }
}
