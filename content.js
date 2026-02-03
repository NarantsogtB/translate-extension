// Subtitle overlay management
let overlay = null;
const CACHE_LOCAL = new Map();

function createOverlay() {
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.id = 'ai-subtitle-overlay';
  Object.assign(overlay.style, {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '24px',
    zIndex: '2147483647',
    textAlign: 'center',
    pointerEvents: 'none',
    display: 'none',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,1)'
  });
  document.body.appendChild(overlay);
  return overlay;
}

async function fetchTranslation(text) {
  if (CACHE_LOCAL.has(text)) return CACHE_LOCAL.get(text);
  
  try {
    const response = await fetch("http://localhost:4210/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation Translate($text: String!, $to: String!) {
          translate(text: $text, to: $to) { translatedText }
        }`,
        variables: { text, to: "Mongolian" }
      }),
    });
    const result = await response.json();
    const translated = result.data.translate.translatedText;
    CACHE_LOCAL.set(text, translated);
    return translated;
  } catch (e) {
    return null;
  }
}

let lastText = "";
const observer = new MutationObserver(async (mutations) => {
  // Common subtitle selectors (YouTube, Netflix, VideoJS, etc.)
  const targetSelectors = [
    '.ytp-caption-segment', 
    '.captions-text', 
    '.shaka-caption-display',
    '.vjs-text-track-display',
    '.vjs-text-track-cue',
    '.vjs-text-track-cue div'
  ];
  
  let currentText = "";
  for (const selector of targetSelectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      currentText = Array.from(elements).map(el => el.innerText).join(" ");
      break;
    }
  }

  if (currentText && currentText !== lastText) {
    lastText = currentText;
    const translated = await fetchTranslation(currentText);
    if (translated) {
      const el = createOverlay();
      el.innerText = translated;
      el.style.display = 'block';
      
      // Attempt to position over the video
      const video = document.querySelector('video');
      if (video) {
        const rect = video.getBoundingClientRect();
        el.style.bottom = `${window.innerHeight - rect.bottom + 40}px`;
      }
    }
  } else if (!currentText) {
    if (overlay) overlay.style.display = 'none';
  }
});

observer.observe(document.body, { childList: true, subtree: true });
console.log("AI Subtitle Translator Active.");
