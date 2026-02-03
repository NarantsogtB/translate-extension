export class TranslationCache {
  private cache = new Map<string, string>();

  get(text: string, to: string): string | undefined {
    const key = `${to}:${text}`;
    return this.cache.get(key);
  }

  set(text: string, to: string, translatedText: string): void {
    const key = `${to}:${text}`;
    this.cache.set(key, translatedText);
  }
}

export const translationCache = new TranslationCache();
