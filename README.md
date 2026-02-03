# AI Subtitle Translator Extension

A browser extension that automatically translates video subtitles to Mongolian in real-time using Google Gemini AI.

## 🎯 Features

- **Real-time Translation**: Automatically detects and translates subtitles as they appear
- **Multi-Platform Support**: Works with YouTube, VideoJS, and other popular video players
- **Smart Caching**: Reduces API calls by caching translations both on backend and client
- **Modern UI**: Clean popup interface with connection status indicator
- **GraphQL Backend**: Production-ready API built with Apollo Server and Bun

## 🏗️ Architecture

```
translate-extension/
├── src/                    # Backend (GraphQL + Gemini AI)
│   ├── server.ts          # Apollo Server setup
│   ├── schema.ts          # GraphQL schema
│   ├── resolvers.ts       # GraphQL resolvers
│   ├── gemini.service.ts  # Gemini AI integration
│   └── cache.ts           # In-memory cache
├── content.js             # Extension content script
├── popup.html/js          # Extension popup UI
└── manifest.json          # Extension manifest
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- Google Gemini API key ([Get one here](https://aistudio.google.com/api-keys))
- Chrome/Brave/Edge browser

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd translate-extension
   bun install
   ```

2. **Set up environment variables:**
   ```bash
   echo 'GEMINI_API_KEY="your-api-key-here"' > .env
   ```

3. **Start the backend server:**
   ```bash
   bun run dev
   ```
   Server will run on `http://localhost:4210/graphql`

4. **Load the extension:**
   - Open Chrome and go to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `translate-extension` folder

## 📖 Usage

1. Make sure the backend server is running (`bun run dev`)
2. Open any video with English subtitles (e.g., YouTube)
3. Enable subtitles/CC on the video
4. Mongolian translation will appear automatically at the bottom of the video

### Testing the Connection

Click the extension icon in your browser toolbar to open the popup and check the backend connection status.

## 🔧 Configuration

### Supported Video Players

The extension currently supports:
- YouTube (`.ytp-caption-segment`)
- VideoJS (`.vjs-text-track-display`, `.vjs-text-track-cue`)
- Generic players (`.captions-text`, `.shaka-caption-display`)

To add support for other players, edit `content.js` and add the appropriate CSS selectors.

### API Configuration

Edit `src/gemini.service.ts` to customize:
- Model selection (default: `gemini-2.5-flash`)
- Translation prompt
- Target language

## 💰 Cost Estimation

Using Gemini 2.5 Flash model:
- **Price**: ~$0.10-0.30 per 1M tokens
- **Usage**: ~50,000-100,000 tokens per hour of video
- **$300 budget**: Approximately 3,000-6,000 hours of video translation

Caching significantly reduces costs for repeated content.

## 🛠️ Development

### Available Scripts

```bash
bun run dev          # Start backend in watch mode
bun run start        # Start backend in production mode
bun run codegen      # Generate TypeScript types from GraphQL schema
```

### GraphQL Schema

```graphql
type Query {
  health: String!
}

type Mutation {
  translate(text: String!, to: String!): Translation!
}

type Translation {
  translatedText: String!
  cached: Boolean!
}
```

### Testing the API

```bash
curl -X POST http://localhost:4210/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { translate(text: \"Hello\", to: \"Mongolian\") { translatedText } }"}'
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 4210 is already in use
- Verify `GEMINI_API_KEY` is set in `.env`
- Run `bun install` to ensure dependencies are installed

### Extension not translating
- Check browser console for errors (F12)
- Verify backend is running and accessible
- Reload the extension in `chrome://extensions`
- Make sure subtitles are enabled on the video

### JSON Parse Errors
- The backend uses strict JSON mode to prevent parsing errors
- Check server logs for raw Gemini API responses
- Verify your API key has sufficient quota

## 📝 License

none

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh/)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- GraphQL server by [Apollo Server](https://www.apollographql.com/)
