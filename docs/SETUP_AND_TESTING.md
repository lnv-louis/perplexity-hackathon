# Setup & Testing Guide

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/lnv-louis/perplexity-hackathon.git
cd perplexity-hackathon

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your PERPLEXITY_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📋 Prerequisites

- **Node.js 18+** or **Bun**
- **Perplexity API Key** - Get one at [perplexity.ai](https://www.perplexity.ai/)

---

## 🔧 Environment Configuration

Create `.env.local` in the root directory:

```env
PERPLEXITY_API_KEY=your_api_key_here
```

**Important:** Never commit your API key to version control.

---

## 📦 Key Dependencies

### Core Stack
- **Next.js 15.5.6** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling

### Perplexity Integration
- **@perplexity-ai/perplexity_ai** - Official SDK
- **Models Used:**
  - `sonar` - Fast prompt generation
  - `sonar-pro` - Deep research queries

### UI Components
- **shadcn/ui** - Component library
- **Lucide React** - Icons with smart selection
- **react-grid-layout** - Draggable/resizable widgets
- **react-zoom-pan-pinch** - Infinite canvas
- **react-markdown** - Markdown rendering with citations

### Visual Effects
- **@shadergradient/react** - Animated backgrounds
- **three.js** - 3D graphics

---

## 📁 Project Structure

```
perplexity-hackathon/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage with search
│   │   ├── housing/page.tsx      # Grid canvas route
│   │   ├── api/
│   │   │   └── search/route.ts   # Perplexity API integration
│   │   └── globals.css           # Global styles
│   ├── pages/
│   │   └── GridPage.tsx          # Main canvas component
│   ├── components/
│   │   ├── SearchComponent.tsx   # Homepage search
│   │   └── grid/
│   │       ├── ChatWindow.tsx    # AI chat interface
│   │       ├── WidgetCard.tsx    # Widget component
│   │       └── ...               # Other grid components
│   ├── lib/
│   │   ├── widgetHelpers.tsx     # Icon mapping & sizing
│   │   └── widgetRenderer.tsx    # Content rendering
│   └── data/
│       └── widgets.json          # Static widget templates
├── docs/
│   ├── README.md                 # Main documentation
│   ├── CHANGELOG.md              # Version history
│   ├── SETUP_AND_TESTING.md     # This file
│   ├── MAJOR_UPDATE_V4.md       # Latest features
│   └── Report.md                 # Hackathon submission
└── .env.local                    # Environment variables (not in git)
```

---

## 🧪 Testing Guide

### Test 1: Homepage Search
1. Open http://localhost:3000
2. Enter: "Is Bloomsbury London safe for families?"
3. Click "Search"
4. **Expected:**
   - Redirects to `/housing?q=...`
   - Chat opens automatically
   - Loading overlay appears with "Generating..."
   - After ~15 seconds, 5 widgets appear centered on canvas
   - Widgets show real Perplexity research data

### Test 2: Chat Interface - Initial Query
1. Go to http://localhost:3000/housing
2. Chat opens with welcome message
3. Type: "Tell me about Camden London"
4. Press Enter
5. **Expected:**
   - "Thinking" indicator appears (gradient orbs)
   - API call runs (~15-20s)
   - 5 widgets populate canvas
   - Success message shows widget count

### Test 3: Follow-Up Query
1. After initial search completes
2. In chat, type: "What about the weather?"
3. Press Enter
4. **Expected:**
   - Single API query runs (~5s, not parallel)
   - 6th widget appears on canvas
   - Message: "I've added 1 new widget about 'Weather' to your canvas!"

### Test 4: Dynamic Widget Sizing
1. Complete a search
2. **Check:**
   - Widgets with long content are taller (2h-3h)
   - Widgets with short content are smaller (1h-2h)
   - All widgets are centered on canvas
   - Citations [1], [2] are clickable blue badges

### Test 5: Markdown Rendering
1. Inspect widget content
2. **Verify:**
   - **Bold text** renders properly (no asterisks)
   - Bullet lists have proper spacing
   - Citations [1][2] are styled as badges
   - Headers are bold and larger

---

## 🔍 Debugging

### Check Browser Console
After search, you should see:
```
Starting housing search query: {query}
Search results received: {data}
📦 API Response Details: {widget_count, widgets}
🔄 Regenerating widgets, apiWidgets count: 5
🎨 Processing API widget: safety Safety Crime Rates
✅ Merging API data for widget: safety
```

### Check Terminal Logs
```
Processing housing search query: {query}
Is follow-up? false
Generated prompts: 5
Search completed, returning 5 widgets
POST /api/search 200 in 15866ms
```

### Common Issues

**Widgets Don't Update:**
- Check console for API errors
- Verify `PERPLEXITY_API_KEY` in `.env.local`
- Check Network tab for 200 status on `/api/search`

**API Times Out:**
- Free tier has rate limits (5 req/min)
- Parallel queries take 15-20s
- Follow-up queries take 5-10s

**Markdown Shows Asterisks:**
- Ensure `react-markdown` is installed
- Check browser console for component errors

---

## 📊 Performance Expectations

| Operation | Time | Notes |
|-----------|------|-------|
| Initial Search | 15-20s | 5 parallel Perplexity queries |
| Follow-up Query | 5-10s | Single focused query |
| Page Load | <2s | Next.js with Turbopack |
| Widget Render | <100ms | React optimization |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard:
# PERPLEXITY_API_KEY = your_key_here
```

### Environment Variables on Vercel
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add: `PERPLEXITY_API_KEY`
4. Redeploy

---

## 🎯 Success Criteria

✅ **PASS if:**
- API calls complete without errors (200 status)
- Console shows "Updated widgets from API: [5 widget IDs]"
- Widget titles are dynamic (from Perplexity)
- Widget content shows real research (not static JSON)
- Citations [1][2] are clickable blue badges
- Follow-up queries add new widgets (6th, 7th, etc.)
- Loading overlay appears during search
- "Thinking" animation shows in chat

❌ **FAIL if:**
- API returns 500 error
- Widgets show only static JSON data
- Console shows "Search error:"
- Citations show as plain text
- Follow-up queries replace widgets instead of adding

---

## 📝 Development Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

---

## 🆘 Support

If you encounter issues:
1. Check browser console for errors
2. Check terminal for API logs
3. Verify API key is correct
4. Ensure rate limits aren't exceeded
5. Review this guide's debugging section

For more help, see [MAJOR_UPDATE_V4.md](./MAJOR_UPDATE_V4.md) for latest features.
