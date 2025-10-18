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
│   ├── README.md                 # Main documentation
│   ├── SETUP.md                  # This file (includes features)
│   ├── CHANGELOG.md              # Version history
│   ├── BACKEND_INTEGRATION.md    # API integration guide
│   └── Report.md                 # Analysis report (DON'T CHANGE)
├── data/
│   └── widgets.json              # Widget content definitions
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

## 🎮 User Features

### Canvas Navigation
- **Pan & Move**: Click & drag anywhere on background to move canvas
- **Zoom Controls**: Mouse wheel (0.1x to 8x range) or bottom-right buttons
- **Return to Center**: Green button [⤢] returns to center view
- **Double Click**: Quick zoom in on any area

### Widget Management
- **Selection**: Click widget to select (green border + "Selected" badge)
- **Deselect**: Click canvas background to deselect
- **Auto-select on Drag**: Grabbing a widget to move it automatically selects it
- **Moving**: Drag widget header to reposition (auto-selects on drag)
- **Resizing**: Drag any of 8 handles (corners + edges) to resize
- **Deleting**: Hover over widget, click red X button in top-right
- **Expand**: Click Maximize icon to see full widget content in popup

### Widget Types
1. **Safety & Crime** - Safety scores, crime stats
2. **Budget & Prices** - Rent prices, affordability
3. **Student Life** - University proximity, student population
4. **Transport & Commute** - Tube/bus times, transport lines
5. **Resident Reviews** - Star ratings, testimonials
6. **Nearby Amenities** - Supermarkets, gyms, cafes
7. **Area Photos** - Neighborhood images, street views

### Visual Design
- **Animated ShaderGradient Background**: WaterPlane shader with green palette
- **Dotted Grid Overlay**: Subtle canva-style grid (20px spacing)
- **Widget Cards**: Pure white with smart selection states (green border when selected)
- **Hover Effects**: Shadow-2xl depth effect on hover
- **Source Citations**: Circular colored indicators at bottom of widgets

### Keyboard Shortcuts (Planned)
- `Space + Drag`: Pan canvas
- `Ctrl/Cmd + Scroll`: Zoom
- `Ctrl/Cmd + 0`: Reset to center
- `Delete`: Remove selected widget
- `Arrow Keys`: Move selected widget

### Responsive Design
- **Large** (1200px+): 12-column grid
- **Medium** (996px+): 10-column grid  
- **Small** (768px+): 6-column grid
- Touch-friendly controls on mobile

---

**All setup complete!** Ready for backend integration.
