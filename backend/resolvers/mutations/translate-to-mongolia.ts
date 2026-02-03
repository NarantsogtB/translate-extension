import { GoogleGenAI } from "@google/genai";
import type { MutationResolvers } from "../../generated";

export const translateToMongolia: MutationResolvers["translateToMongolia"] =
  async (_, { input }, { env }) => {
    const { text, to } = input;
    const ai = new GoogleGenAI({
      apiKey: env.GOOGLE_API!,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are a professional subtitle translator.

Rules:
- Translate ONLY the given text.
- Output MUST be valid JSON.
- Do NOT add explanation.
- Keep original meaning.
- Use natural Mongolian spoken language.
- Keep technical words unchanged.

Return format:
{
  "translatedText": "string"
}

Text:
"""${text}"""

Target language: ${to}
`,
            },
          ],
        },
      ],
    });
    return result;
  };
