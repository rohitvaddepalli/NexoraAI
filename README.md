# NexoraAI — AI Tool Discovery Platform

**NexoraAI** is a complete AI Tool Discovery Platform that helps you search, explore, and curate the best AI tools across every category.

## ✨ Features

- 🔍 **Search** across 40+ real AI tools by name, category, and tags
- 🗂️ **8 Categories** — Writing, Coding, Image Generation, Video, Voice, Design, Research, Business
- ❤️ **Favorites** — Save tools with localStorage persistence
- 🏗️ **AI Stacks** — Build and share curated tool collections
- ⚖️ **Compare** — Side-by-side comparison of up to 3 tools
- 🕐 **Recent Searches** — Persistent search history (max 8)
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- 🌟 **Skeleton Loading** — Shimmer placeholders while loading
- 🔔 **Toast Notifications** — Feedback on all key actions
- 🚀 **Vercel Ready** — One-click deployment

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI Framework |
| Vite | 5 | Build Tool |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 12 | Animations |
| Lucide React | Latest | Icons |
| React Router DOM | 7 | Routing |
| localStorage | — | Persistence |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx vite --port 5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Header, Footer, MobileNav
│   ├── ui/             # ToolCard, SearchBar, Toast, etc.
│   └── modals/         # CreateStackModal, ShareModal
├── pages/              # 8 pages (Landing, Explore, ToolDetail, etc.)
├── hooks/              # useFavorites, useStack, useSearch, useLocalStorage
├── data/               # tools.json (40 AI tools)
├── utils/              # helpers.js
└── context/            # AppContext (global state)
```

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, featured tools, categories, trending |
| `/explore` | Explore | Filterable tool grid with sidebar |
| `/tool/:id` | Tool Detail | Full details, tabs, similar tools |
| `/favorites` | Favorites | Saved tools with sort options |
| `/stacks` | My Stack | Create and manage tool stacks |
| `/search` | Search | Real-time search with recent history |
| `/category/:slug` | Category | Category-specific tool browsing |
| `/compare` | Compare | Side-by-side tool comparison |

## 🎨 Design System

- **Background**: `#0A0A0F` (near black)
- **Surface**: `#13131A` (cards)
- **Accent**: `#7C6EF5` (violet)
- **Fonts**: Space Grotesk (headings) + Inter (body)
- **Animations**: Framer Motion page transitions + Shimmer loading

## 🚀 Deploying to Vercel

1. Push to GitHub
2. Import in Vercel
3. Deploy — the `vercel.json` handles SPA routing automatically

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## 🧰 AI Tools Included

ChatGPT, Claude, Gemini, Midjourney, DALL-E 3, Stable Diffusion, Adobe Firefly, ElevenLabs, Murf AI, Descript, Runway, Sora, Synthesia, HeyGen, Pika, Luma AI, Kling AI, GitHub Copilot, Cursor, Tabnine, Lovable, Bolt.new, v0 by Vercel, Canva AI, Framer AI, Perplexity, Consensus, Elicit, You.com, Notion AI, Jasper AI, Grammarly, Copy.ai, Zapier AI, Make, n8n, Gamma, Beautiful.ai, Tome, Wordtune
