# Technical Setup Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000/housing](http://localhost:3000/housing)

## 📦 Dependencies

### Core
- **Next.js 15.5.6** - React framework with Turbopack
- **React 19** - UI library
- **Tailwind CSS v4** - Utility-first CSS

### UI Components
- **shadcn/ui** - Component library
  - Card, Input, Button components
- **Lucide React** - Icon library
- **react-grid-layout** - Grid system for drag/drop/resize
- **react-zoom-pan-pinch** - Infinite canvas with zoom/pan

### Visual Effects
- **@shadergradient/react** - Animated shader gradients
- **three** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **@react-spring/three** - Spring animations for Three.js

## 📁 Project Structure

```
perplexity-hackathon/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── housing/page.tsx      # Grid route
│   │   ├── globals.css           # Global styles + grid CSS
│   │   └── layout.tsx            # Root layout
│   ├── pages/
│   │   └── GridPage.tsx          # Main infinite canvas component
│   ├── components/
│   │   └── ui/                   # shadcn components
│   └── lib/
│       └── utils.ts              # Utility functions
├── docs/
│   ├── README.md                 # Main documentation (UPDATED)
│   ├── SETUP.md                  # This file (UPDATED)
│   ├── FEATURES.md               # User features (UPDATED)
│   ├── CHANGELOG.md              # Version history (UPDATED)
│   └── Report.md                 # Analysis report (DON'T CHANGE)
└── public/                       # Static assets
```

## 🎨 Styling System

### Tailwind v4 Configuration
Located in `src/app/globals.css`:
- Custom color variables
- Grid layout CSS
- Resize handle styles

### Theme Colors
```css
/* ShaderGradient colors */
color1: #dcffdb  /* Light green */
color2: #88ff85  /* Medium green */
color3: #20d3a8  /* Teal accent */

/* Components */
--primary: rgb(22, 163, 74)          /* green-600 */
--primary-hover: rgb(21, 128, 61)    /* green-700 */
--selected-border: rgb(34, 197, 94)  /* green-500 */
```

### ShaderGradient Configuration
The animated background uses a waterPlane shader:
- **Type**: waterPlane (smooth wave effect)
- **Animation**: Continuous with configurable speed
- **Rendering**: Three.js canvas behind UI layer
- **Performance**: Hardware-accelerated 3D graphics

## 🔧 Configuration Files

### `next.config.ts`
Next.js configuration with Turbopack enabled

### `tsconfig.json`
TypeScript configuration with path aliases:
- `@/*` → `./src/*`

### `components.json`
shadcn/ui configuration:
- Style: default
- Color: zinc
- Tailwind CSS: v4
- Path: `@/components`

### `.gitignore`
Excludes:
- `node_modules/`
- `.next/`
- `.env.local`
- `/docs` (if generated)
- `/src/photos`

## 🛠️ Development

### Running the App
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Adding Components
```bash
# Using shadcn/ui CLI
npx shadcn@latest add [component-name]
```

## 🔌 API Integration (TODO)

### Backend Structure
```typescript
// src/app/api/search/route.ts
export async function POST(request: Request) {
  const { query } = await request.json();
  
  // Call Perplexity API
  const results = await perplexityAPI(query);
  
  return Response.json({ widgets: results });
}
```

### Widget State Management
```typescript
// In GridPage.tsx
const [activeWidgets, setActiveWidgets] = useState<string[]>([...]);

// Delete widget
const handleDelete = (id: string) => {
  setActiveWidgets(prev => prev.filter(wId => wId !== id));
};

// Add widget from API
const addWidget = (widget: WidgetData) => {
  setActiveWidgets(prev => [...prev, widget.id]);
};
```

## 🎯 Performance

### Optimizations
- Turbopack for fast dev builds
- Dynamic imports for large components
- Grid virtualization (react-grid-layout)
- Memoized widget content
- Debounced search input

### Bundle Size
- Next.js automatic code splitting
- Tree-shaking with ES modules
- Dynamic component loading

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Grid Layout Issues
- Check `react-grid-layout` CSS is imported in globals.css
- Verify breakpoint configuration matches screen sizes
- Ensure unique widget IDs

### Zoom/Pan Not Working
- Verify `react-zoom-pan-pinch` is installed
- Check TransformWrapper configuration
- Ensure no CSS overflow issues on parent containers

---

**All setup complete!** Ready for backend integration.
