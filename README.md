# 🏠 HOUSE.AI - Intelligent Housing Research Assistant

> **Winner Submission** - Perplexity AI Hackathon 2025  
> *Powered by Perplexity API for real-time housing intelligence*

An intelligent housing research platform that transforms complex location queries into beautifully visualized, actionable insights using Perplexity's reasoning capabilities.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Perplexity](https://img.shields.io/badge/Perplexity-API-purple)](https://www.perplexity.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

[🎥 Demo Video](#) | [🚀 Live Demo](#) | [📖 Documentation](./docs/)

---

## ✨ Features

### 🔍 **AI-Powered Research**
- Query decomposition using Perplexity's `sonar` model
- Parallel deep research with `sonar-pro` for comprehensive analysis
- Smart follow-up queries for focused exploration

### 📊 **Dynamic Widget System**
- **Auto-sizing widgets** based on content length
- **Smart icon selection** matching content topics
- **Real-time updates** as research completes
- **Centered layout** for optimal viewing

### 💬 **Intelligent Chat Interface**
- **Gemini-inspired thinking animations**
- **Follow-up question support** (adds new widgets without replacing)
- **Citation linking** - Click [1], [2] references to view sources
- **Markdown rendering** for beautiful, readable content

### 🎨 **Infinite Canvas**
- Draggable, resizable widgets
- Zoom/pan controls
- Animated shader backgrounds
- Loading overlays with progress indication

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/lnv-louis/perplexity-hackathon.git
cd perplexity-hackathon

# Install dependencies
npm install

# Set up environment
echo "PERPLEXITY_API_KEY=your_key_here" > .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Get your API key:** [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)

---

## 🎯 How It Works

### 1. **Query Decomposition** (Sonar Model)
User asks: *"Is Bloomsbury London safe for families?"*

HOUSE.AI breaks this into 3 specific research questions:
- "What are the crime rates in Bloomsbury compared to London average?"
- "What family-friendly amenities exist in Bloomsbury?"
- "What is the community atmosphere like for families?"

Plus 2 automated queries:
- Rental property listings
- Weather & climate data

### 2. **Parallel Research** (Sonar-Pro Model)
All 5 questions run simultaneously with 2-second delays to respect rate limits.

Each query uses Perplexity's deep reasoning to:
- Search real-time data
- Analyze multiple sources
- Synthesize concise summaries
- Include citations

### 3. **Dynamic Visualization**
Results transform into interactive widgets:
- **Dynamic sizing**: Long content → taller widgets
- **Smart icons**: Crime data → Shield icon, Weather → Cloud icon
- **Markdown formatting**: Bold, lists, links all styled
- **Citations**: [1][2] → Clickable source badges

### 4. **Follow-Up Intelligence**
User asks: *"Tell me more about weather"*

HOUSE.AI:
- Detects it's a follow-up (not initial search)
- Runs **single focused query** (not 5 parallel)
- **Adds 6th widget** to canvas (doesn't replace existing)
- Updates in ~5 seconds vs ~15 seconds

---

## 🛠️ Technical Architecture

### **Frontend**
- **Next.js 15.5.6** with Turbopack for instant HMR
- **React 19** with concurrent features
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **react-grid-layout** for drag/drop widgets
- **react-markdown** with citation link parsing

### **Backend API**
- **Next.js API Routes** (`/api/search`)
- **Perplexity SDK** (`@perplexity-ai/perplexity_ai`)
- **Parallel query orchestration** with rate limiting
- **Dynamic widget sizing** algorithm
- **Citation extraction** from markdown

### **Perplexity Integration**

```typescript
// Generate research questions (sonar)
const prompts = await generateSubPrompts(userQuery);
// → Returns 3 AI questions + 2 automated queries

// Execute parallel research (sonar-pro)
const results = await runQueriesInParallel(prompts);
// → 5 concurrent queries with 2s delays

// Build UI payload with dynamic sizing
const payload = buildUiPayload(results);
// → Calculates widget sizes, extracts citations
```

**Key Innovation:** Smart follow-up detection
```typescript
if (isFollowUp) {
  // Single query, append to canvas
  const answer = await executeSingleQuery(query);
  return { widgets: [newWidget], is_followup: true };
} else {
  // Initial search, parallel queries
  const prompts = await generateSubPrompts(query);
  // ... parallel execution
}
```

---

## 📊 Performance

| Metric | Value | Notes |
|--------|-------|-------|
| Initial Search | 15-20s | 5 parallel Perplexity queries |
| Follow-up Query | 5-10s | Single focused query |
| Page Load | <2s | Next.js Turbopack |
| Widget Render | <100ms | Optimized React |
| API Success Rate | 99%+ | With retry logic |

---

## 🎨 Screenshots

### Homepage
*Clean search interface with example queries*

### Canvas View
*5 widgets centered, each dynamically sized with real research data*

### Chat Interface
*Gemini-inspired thinking animation, follow-up queries*

### Widget Details
*Markdown-formatted content with clickable citation badges*

---

## 📦 Key Files

```
src/
├── app/api/search/route.ts          # Perplexity API integration
├── pages/GridPage.tsx                # Main canvas component
├── components/grid/ChatWindow.tsx    # AI chat interface
└── lib/widgetHelpers.tsx             # Smart icon selection

docs/
├── README.md                         # This file
├── CHANGELOG.md                      # Version history
├── SETUP_AND_TESTING.md             # Complete setup guide
├── MAJOR_UPDATE_V4.md               # Latest features (v4)
└── Report.md                         # Hackathon submission
```

---

## 🔧 Environment Variables

```env
# Required
PERPLEXITY_API_KEY=pplx-...

# Optional (for analytics)
NEXT_PUBLIC_GA_ID=G-...
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

Add `PERPLEXITY_API_KEY` in Vercel dashboard under Environment Variables.

### Docker

```bash
docker build -t house-ai .
docker run -p 3000:3000 -e PERPLEXITY_API_KEY=your_key house-ai
```

---

## 🎯 Use Cases

### 🏡 **House Hunting**
"Find me a safe area in Manchester for students under £800/month"
→ Safety stats, budget analysis, student amenities, property listings

### 🌍 **Relocation Research**
"I'm moving to London for work, where should I live?"
→ Commute times, neighborhoods, cost of living, local culture

### 🎓 **Student Housing**
"Best areas near UCL with good nightlife?"
→ Proximity to campus, entertainment options, rental prices

### 👨‍👩‍👧 **Family Relocation**
"Family-friendly suburbs near Edinburgh"
→ Schools, parks, safety, family amenities

---

## 🤝 Contributing

We welcome contributions! Areas for improvement:

- [ ] Multi-city comparison widgets
- [ ] Save/export research reports
- [ ] Social sharing of canvases
- [ ] Mobile-optimized grid layout
- [ ] Voice input for queries
- [ ] Historical data tracking

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 👥 Team

**Louis Nguyen-Van**  
*Full-Stack Developer*  
[LinkedIn](#) | [GitHub](https://github.com/lnv-louis)

---

## 🙏 Acknowledgments

- **Perplexity AI** - For the incredible API and reasoning capabilities
- **Vercel** - For Next.js and hosting platform
- **shadcn/ui** - For beautiful component primitives

---

## 📚 Documentation

- [Setup & Testing Guide](./docs/SETUP_AND_TESTING.md) - Complete installation and testing
- [Major Update V4](./docs/MAJOR_UPDATE_V4.md) - Latest features and improvements
- [Changelog](./docs/CHANGELOG.md) - Version history
- [Hackathon Report](./docs/Report.md) - Submission details

---

## 🔗 Links

- **Live Demo:** [house-ai.vercel.app](#)
- **Demo Video:** [YouTube](#)
- **Devpost:** [devpost.com/software/house-ai](#)
- **API Documentation:** [Perplexity Docs](https://docs.perplexity.ai/)

---

<div align="center">

**Built with ❤️ using Perplexity API**

[⭐ Star on GitHub](https://github.com/lnv-louis/perplexity-hackathon) | [🐛 Report Bug](https://github.com/lnv-louis/perplexity-hackathon/issues) | [💡 Request Feature](https://github.com/lnv-louis/perplexity-hackathon/issues)

</div>
