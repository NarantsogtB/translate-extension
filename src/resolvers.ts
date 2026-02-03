import { translationCache } from './cache';
import { translateText } from './gemini.service';

export const resolvers = {
  Query: {
    health: () => 'OK',
  },
  Mutation: {
    translate: async (_: any, { text, to }: { text: string; to: string }, context: any) => {
      // Normalize input
      const normalizedText = text.trim().replace(/\s+/g, ' ');

      // Ignore empty or very short text (< 3 characters)
      if (normalizedText.length < 3) {
        return {
          translatedText: normalizedText,
          cached: false,
        };
      }

      // Check cache
      const cachedResult = translationCache.get(normalizedText, to);
      if (cachedResult) {
        return {
          translatedText: cachedResult,
          cached: true,
        };
      }

      // Call Gemini API
      const translatedText = await translateText(normalizedText, to);

      // Store in cache
      translationCache.set(normalizedText, to, translatedText);

      return {
        translatedText,
        cached: false,
      };
    },
  },
};
