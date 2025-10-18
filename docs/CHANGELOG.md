# Changelog

All notable changes to the Homiq project.

# Changelog

All notable changes to HOUSE.AI will be documented in this file.

## [4.0.0] - 2025-10-18

### 🎉 Major Features

#### Dynamic Widget System
- **Auto-sizing widgets** based on content length (1x1 to 2x3 grid units)
- **Smart icon selection** - Automatically chooses appropriate Lucide icons based on content
- **Centered layout** - All widgets centered on canvas for better UX
- **Progressive loading** - Widgets appear one-by-one with visual feedback

#### Advanced Citation System
- **Clickable citations** - [1], [2] references render as styled badges
- **Source linking** - Direct links to referenced sources
- **Citation extraction** - Automatic parsing from Perplexity responses
- **Badge styling** - Blue pills with hover effects

#### Intelligent Follow-Up Queries
- **Context awareness** - Detects follow-up vs initial queries
- **Single query mode** - Follow-ups run one focused query (not 5 parallel)
- **Widget appending** - New widgets add to canvas instead of replacing
- **Faster responses** - 5-10s for follow-ups vs 15-20s for initial

#### Enhanced Chat Interface
- **Gemini-inspired animations** - Gradient orb "Thinking" indicator
- **Loading states** - Transparent visual cues without blocking messages
- **Follow-up detection** - Smart handling of conversation context
- **Success messaging** - Clear feedback on widget creation

#### Visual Improvements
- **Loading overlay** - Translucent grey canvas with "Generating..." text
- **Progress indication** - Spinner + pulse animation
- **Markdown rendering** - Headers, bold, lists, citations all styled
- **Header formatting** - H1/H2/H3 with proper sizing and weight

### 🔧 Technical Improvements
- Added `react-markdown` and `remark-gfm` for markdown support
- Implemented dynamic layout algorithm with centering
- Added `getSmartIcon()` helper for content-based icon selection
- Expanded icon library (CloudRain, Building, TrendingUp, Trees, Heart, etc.)
- Enhanced API route with `isFollowUp` flag support
- Improved widget size calculation algorithm
- Added citation data structure to API responses

### 🐛 Bug Fixes
- Fixed markdown rendering showing raw asterisks (**text** → **text**)
- Fixed widget layout not updating with API data
- Corrected dynamic sizing not being applied
- Fixed follow-up queries replacing instead of appending widgets

### 📚 Documentation
- Consolidated docs into 5 main files (README, CHANGELOG, SETUP_AND_TESTING, MAJOR_UPDATE_V4, Report)
- Removed redundant docs (mario.md, CONSOLE_TEST.md, old SETUP.md, TEST_PLAN.md)
- Updated README.md for GitHub with comprehensive feature overview
- Created unified SETUP_AND_TESTING.md guide

---

## [3.11.0] - 2025-10-18 - Backend Integration Implementation

### Added
🔗 **Pure Next.js Backend Integration**
- **Complete Migration**: Moved from Python (`test_3.py`) to pure TypeScript implementation
- **API Route**: Full backend logic in `/src/app/api/search/route.ts`
  - `generateSubPrompts()`: Converts user queries into 3 research questions + rental + weather prompts
  - `executeSingleQuery()`: Executes individual Perplexity API calls with rate limiting
  - `runQueriesInParallel()`: Parallel execution with 2-second delays between requests
  - `buildUiPayload()`: Transforms results into widget-compatible JSON structure
- **Error Handling**: Comprehensive error handling and logging for API failures
- **Type Safety**: Full TypeScript interfaces for API requests/responses
- **Content Processing**: Smart handling of Perplexity API response formats (string/array)

🎯 **Two-Path User Journey**
- **Search Path**: Homepage search → GridPage with query → Chat opens with user question
- **Explore Path**: "Get Started" → GridPage with welcome chat → Assistant greeting
- **URL Parameters**: `?q=query` for search, `?welcome=true` for explore mode
- **Auto Chat**: Chat automatically opens based on entry method

🎨 **UI/UX Improvements**
- **Square Canvas**: Reduced canvas from 4000x3000px to 2000x2000px (more readable)
- **Default View**: Centered view with 0.6x zoom, positioned at (-200, -100) for optimal widget visibility
- **Search Bar**: Added floating search bar on GridPage for continued searching
- **Chat Integration**: 
  - Shows user query first when coming from homepage search
  - Shows loading indicator during Perplexity research
  - Welcome message for "Get Started" users
  - Auto-opens based on entry context

### Technical Details
- **Single Language Stack**: Pure TypeScript/Next.js (Python `test_3.py` kept for reference only)
- **Perplexity Models**: Using `sonar` for prompt generation, `sonar-pro` for research
- **Rate Limiting**: 2-second delays between parallel API calls to respect limits
- **JSON Schema**: Structured widget output matching existing UI components
- **Property Extraction**: Smart parsing of rental listings with URL detection
- **Environment**: `.env.local` file setup with `PERPLEXITY_API_KEY`
- **Canvas Optimization**: Smaller grid for better text readability and performance

### Deployment
- **Single Service**: Pure Vercel deployment (no external services required)
- **Zero Dependencies**: No Python runtime or external APIs needed
- **Production Ready**: All code in TypeScript with proper error handling

## [v3.10] - 2025-01-XX - Performance Optimization & Responsive Design

### Changed
⚡ **Performance Optimizations**
- **GridPage**: All event handlers wrapped with `useCallback` to prevent unnecessary re-renders
  - `handleZoomIn`, `handleZoomOut`, `handleZoomReset`
  - `handleChatOpen`, `handleChatClose`
  - `handleWidgetMouseEnter`, `handleWidgetMouseLeave`
- **WidgetCard**: Wrapped with `React.memo` to prevent re-renders when props unchanged
- **ZoomControls**: Wrapped with `React.memo` for better performance
- **Breadcrumb**: Wrapped with `React.memo` to avoid unnecessary re-renders
- **ChatWindow**: All event handlers optimized with `useCallback`
  - `scrollToBottom`, `handleSubmit`, `handleFileSelect`
  - `handleKeyDown`, `handleInputChange`, `handleRemoveFile`, `handleFileButtonClick`
- **ExpandedWidgetModal**: Optimized with `React.memo` and `useCallback` for all handlers

📱 **Responsive Design Improvements**
- **GridPage**: Removed hardcoded canvas dimensions (`min-h-[3000px] min-w-[4000px]`)
  - Changed to `w-full min-h-screen` for fluid responsive layout
  - Canvas now adapts to viewport size on all devices
- **ChatWindow**: Made responsive for mobile devices
  - Width: `w-[500px]` → `w-full sm:w-[500px]`
  - Full width on mobile, 500px sidebar on desktop

🎯 **Widget Positioning**
- Widgets now start from top-left corner (0,0) instead of center (3,3)
- Better default layout for new users

### Technical
- Added `displayName` to all memoized components for better debugging
- Eliminated inline function creation in render methods
- Reduced unnecessary component re-renders across the application
- Improved mobile experience with responsive breakpoints

## [v3.9] - 2025-10-18 - UI Overhaul & Feature Additions

### Added
✨ **New Pages**
- **Login Page** (`/login`)
  - Shader gradient background (green theme)
  - Email/password authentication UI
  - Social login buttons (Google, GitHub)
  - Toggle between sign-in and sign-up modes
  - "Back to Home" button in top-left
  - Remember me checkbox
  - Forgot password link

- **Contact Page** (`/contact`)
  - Shader gradient background (matching login)
  - Contact form (name, email, subject, message)
  - Email contact card (support@homiq.com)
  - All content in white Card containers
  - Clean, professional layout
  - Removed Next.js logo

✨ **Chat Interface**
- Minimalistic slide-in panel from right (500px width)
- Clean header with only close button
- No starter AI messages (starts empty)
- Simple message bubbles without profile icons
- No timestamps for cleaner look
- File upload support
- Auto-expanding textarea
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- "Press Enter..." hint above input row
- Centered action buttons
- Loading state with animated dots

✨ **Homepage Improvements**
- Smooth Lovable-style typing animation
- Cycles through 5 different search phrases
- Removed Next.js logo
- "Homiq" text enlarged (text-4xl) with system font
- Login and Contact Us buttons without borders
- Green hover effect on both header buttons
- Consistent button styling and sizing

### Changed
🎨 **GridPage Improvements**
- Removed "Homiq" text from center of page
- Chat button changed from `rounded-full` to `rounded-lg` (more rectangular)
- Default view zoomed out (initialScale: 1 → 0.6)
- Expanded canvas area (4000x3000px for more grid space)
- Grid dots kept at 30px spacing (not 150px)
- Widgets now fully resizable at all times
- Widgets start centered (x: 3, y: 3) instead of top-left
- Removed conditional resize handle CSS

🎨 **Visual Design**
- Shader gradient backgrounds on login and contact pages
- White containers for all text content
- Consistent green theme throughout
- More minimalistic chat interface
- Cleaner button styles

### Fixed
🐛 **Resize Functionality**
- Removed CSS that hid resize handles
- Widgets are now always resizable (isResizable: true)
- No more conditional resize based on selection

### Technical
- Added `@shadergradient/react` for animated backgrounds
- Typing animation uses requestAnimationFrame
- Chat panel uses transform transitions for smooth slide-in
- Improved state management for chat messages
- Backdrop overlay for chat panel

## [v3.8] - 2025-10-18 - Navigation & Layout Updates

### Added
✨ **Search Bar on Homepage**
- Moved search functionality from GridPage to homepage
- Functional search with query parameters
- Navigates to `/housing?q=...` on search
- Enter key support
- Green search button

✨ **Contact Us Navigation**
- Added Contact Us link to homepage header
- Links to `/contact` page (to be created)

### Changed
🎨 **Grid Layout**
- Grid spacing doubled (30px → 60px)
- More visible dotted grid pattern
- Better visual separation between grid points

🎨 **Widget Resize Control**
- Widgets only resizable when selected
- Changed `isResizable={false}` globally
- Added conditional `.resizable-widget` class
- CSS hides resize handles unless selected
- Cleaner UI when widgets not in use

🎨 **Grid Boundaries**
- Reduced padding from `p-24` to `p-6`
- Widgets can now be placed near corners
- Only 1 grid square from edge (was 3)
- More usable canvas space

## [v3.7] - 2025-10-18 - Polish & Bug Fixes

### Fixed
🐛 **Zoom Sensitivity Further Reduced**
- Wheel step: 0.02 → 0.01 (50% less sensitive)
- Smooth step: 0.002 → 0.001 (50% less sensitive)
- Button increments: 0.2 → 0.1 (50% less sensitive)
- Min scale: 0.1 → 0.5 (prevents over-zooming out)
- Max scale: 8 → 3 (prevents excessive zoom in)
- Much smoother, more controlled zooming

🐛 **Search Bar Zoom Bug Fixed**
- Added `excluded: ['input', 'button', 'a']` to wheel and panning config
- Prevents zooming when scrolling over search bar
- Prevents panning when interacting with search bar
- No more accidental canvas movement during search

🐛 **Widget "Lift Up" Bug Fixed**
- Changed from `draggableCancel` to `draggableHandle` approach
- Added `.drag-handle` class to widget header
- Added `.no-drag` class to widget container
- Only the header can drag the widget now
- Clicking widget body just selects it (glow effect)
- No more accidental displacement on click

🎨 **Visual Improvements**
- **Search bar**: Removed grey inner border, cleaner look
- **Dotted grid**: Increased size (20px → 30px spacing)
- **Dotted grid**: Changed to white dots (rgba(255,255,255,0.5))
- **Dotted grid**: Increased dot size (1px → 2px)
- Grid now much more visible and professional

✨ **Expand Widget Animation**
- Added smooth fade-in animation (opacity 0 → 100)
- Added smooth scale animation (95% → 100%)
- Smooth fade-out on close with 200ms delay
- Modal centers smoothly with backdrop blur
- Professional popup experience

### Changed
⚙️ **Drag Interaction**
- Widget header now has `cursor-move` class
- Clear visual indication of draggable area
- Content area is click-only (selection)
- Resize handles still work on all edges

### Removed
- ❌ Deleted `docs/BACKEND_INTEGRATION.md` (outdated)

### Technical
- TransformWrapper now excludes UI elements from zoom/pan
- ExpandedWidgetModal uses requestAnimationFrame for smooth animation
- Added state management for animation timing
- Improved event handling hierarchy

## [v3.6] - 2025-10-18 - Major Refactoring & UX Improvements

### Added
✅ **Component Modularization**
- Created `/src/components/grid/WidgetCard.tsx` - Individual widget component
- Created `/src/components/grid/SearchBar.tsx` - Search bar with animated placeholders
- Created `/src/components/grid/ZoomControls.tsx` - Bottom-right zoom buttons
- Created `/src/components/grid/Breadcrumb.tsx` - Back to home navigation
- Created `/src/components/grid/ExpandedWidgetModal.tsx` - Full-screen widget view
- Created `/src/lib/widgetHelpers.tsx` - Widget utilities (iconMap, calculateWidgetHeight)
- Created `/src/lib/widgetRenderer.tsx` - Widget content rendering logic

✅ **Animated Search Bar**
- Typing animation with rotating suggested queries
- "Ask Homiq to find affordable houses in..."
- "Ask Homiq to compare different flats in..."
- Multiple suggestions cycling through
- Smooth typing and deleting animation

✅ **Breadcrumb Navigation**
- "Back to Home" button in top-left corner
- Same visual level as search bar
- Rounded pill design with shadow
- ChevronLeft icon for clarity

### Changed
🎨 **Branding**
- App renamed from "HOUSE.AI" to "Homiq"
- Updated header logo text
- Updated search bar placeholder text

🔧 **Homepage Cleanup**
- Removed: "AI-powered research that understands what you really need to know about any area"
- Removed: Example query pills ("bloomsbury student uni safe cheap", etc.)
- Simplified to just headline and CTA button
- Cleaner, more focused landing page

⚙️ **Zoom Sensitivity**
- Reduced wheel step: 0.05 → 0.02 (less sensitive)
- Reduced smooth step: 0.005 → 0.002
- Zoom buttons: 0.3 → 0.2 increment
- More gradual, controlled zooming experience

🐛 **Drag Bug Fix**
- Canvas panning now disabled when widget selected (`disabled: selectedWidget !== null`)
- Prevents canvas from moving when trying to drag a selected widget
- Fixes issue where clicking widgets sent them to random locations
- Smooth transition between selecting and dragging widgets

🎨 **Grid Cleanup**
- Removed old inline dotted grid div overlay
- Kept only CSS-based dotted grid via `.canvas-background::before`
- Single, clean dotted grid implementation
- Proper z-index layering maintained

### Technical
- GridPage.tsx reduced from 573 lines to ~210 lines (63% reduction)
- Separated concerns: UI components, logic helpers, rendering
- Improved code maintainability and reusability
- Better TypeScript type safety with component props
- Memoization optimizations preserved
- Event handler isolation in components

### Fixed
- 🐛 Widget drag bug (canvas moving instead of widget)
- 🐛 Selection state causing movement issues
- 🐛 Canvas interaction conflicting with widget selection
- 🐛 Search bar inner border removed (cleaner design)

## [v3.5] - 2025-10-18 - Widget Selection & Z-Index Fixes

### Added
✅ **Smart Widget Selection System**
- Click any widget to select it (shows green border + "Selected" badge)
- Click canvas background to deselect
- **Auto-select on drag**: When you grab a widget to move it, it auto-selects
- Only one widget selected at a time
- Selection state maintained during interactions

✅ **Improved Widget Interaction Logic**
- Drag any widget to move it (auto-selects on drag start)
- If another widget is selected, dragging a different widget switches selection to the grabbed one
- Smooth transition between selected widgets
- Delete button removes selection if deleting selected widget

### Fixed
🐛 **Z-Index Issues Resolved**
- **Dotted grid now behind widgets**: Added proper z-index layering
  - Canvas background: z-index 1
  - Dotted grid pattern: z-index 1 (via ::before pseudo-element)
  - Grid layout container: z-index 5
  - Individual widgets: z-index 10
- Widgets now properly appear above dotted grid at all times
- No more widgets appearing behind grid dots

🎨 **Visual Improvements**
- Selection indicator with green border (2px) and shadow
- "Selected" badge in top-left corner (green background, white text)
- Dotted grid pattern now uses CSS pseudo-element for better layering
- Grid dots: 20px spacing, subtle gray color (rgba 156,163,175,0.3)

### Changed
⚙️ **UX Improvements**
- Canvas panning remains enabled at all times (no more panning lock)
- Widgets remain draggable regardless of selection state
- Selection provides visual feedback without restricting movement
- Clicking widget content selects it (with stopPropagation)

### Technical
- Restored `selectedWidget` state management
- Added `handleWidgetClick()` callback
- Added `handleCanvasClick()` for deselection
- Added `handleDragStart()` to auto-select on drag
- Updated `handleDelete()` to clear selection if needed
- CSS restructure: `.canvas-background::before` for dotted grid
- Z-index hierarchy properly defined in globals.css

## [v3.4] - 2025-10-18 - JSON-Based Widgets & Major UX Improvements

### Added
✅ **JSON-Based Widget System**
- Created `/data/widgets.json` for dynamic widget content
- Widgets now generated from JSON instead of hard-coded
- Smart height calculation based on content length
- Easy to extend with more widgets via JSON

✅ **Widget Expand/Collapse Feature**
- New expand button (Maximize icon) next to delete button
- Smooth animation to center popup when expanded
- Click outside or X button to close expanded view
- Expanded view shows full widget content

✅ **Grid Snapping**
- Widgets now snap to grid based on react-grid-layout settings
- Clean, organized layout with margin: [16, 16]
- Better visual alignment with rowHeight: 50

✅ **Infinite Canvas Improvements**
- Removed canvas boundary limitations
- True "infinite" canvas (min-w-[2000px], min-h-screen)
- Widgets can be placed and expanded anywhere

### Changed
🎨 **Visual Improvements**
- **Removed Next.js Dev Indicator**: Hidden via CSS (.nextjs-toast-errors-parent { display: none; })
- **Better shadows**: More prominent hover effects (shadow-2xl)
- Green theme maintained throughout

⚙️ **UX Fixes**
- **Always draggable**: Move widgets anytime
- **Always resizable**: Resize widgets from all 8 handles
- **Smooth interactions**: Clean state management

### Technical
- Dynamic layout generation based on widget content
- Icon mapping system for JSON icon types
- `renderWidgetContent()` function for widget-specific rendering
- `calculateWidgetHeight()` for smart sizing
- Responsive breakpoints maintained (lg/md/sm)
- Grid compaction type: "vertical"

### Removed
- ❌ Canvas boundary limitations
- ❌ Static widget definitions (moved to JSON)

## [v3.3] - 2025-10-18 - UX Improvements & Backend Integration Ready

### Added
✅ **Homepage Buttons**
- Login button: White background, black text, border
- Get Started button: Dark green (#166534), white text
- Matches housai.png design vision

✅ **Backend Integration Documentation**
- Created BACKEND_INTEGRATION.md with complete API spec
- Defined JSON output format for Perplexity API
- Documented widget content structure
- Progressive loading strategy
- Parallel prompting guide for 7 widget types

### Changed
🎨 **Visual Improvements**
- **More visible grid**: Dots increased to 1.5px, opacity to 50%
- **Enhanced hover shadows**: shadow-xl → shadow-2xl for better visibility
- **Bigger widget headers**: text-base → text-lg font-bold
- **Larger icons**: w-4 h-4 → w-5 h-5, green color
- **Smaller footer**: py-2 → py-1.5, text-xs → text-[10px]
- **Global dark green**: All buttons use #166534 (green-800)

⚙️ **UX Fixes**
- **Always draggable**: Removed selection lock on dragging
- **Always resizable**: Can resize widgets anytime
- **Fixed deselection bug**: Click canvas background works properly now
- **Better click detection**: Works on TransformComponent wrapper too
- **Widget structure**: Clear 3-part layout (Header | Body | Footer)
- **Body always visible**: Content never hidden in base state

### Technical
- Updated icon sizes in widget definitions (w-5 h-5)
- Enhanced handleCanvasClick to detect more click targets
- Removed isDraggable/isResizable conditional logic
- Improved widget border visibility on selection
- Added stopPropagation to widget click handler

## [v3.2] - 2025-01-17 - ShaderGradient & Selection States

### Added
✅ **Animated ShaderGradient Background**
- Dynamic 3D shader using @shadergradient/react + Three.js
- WaterPlane shader with green color palette (#dcffdb, #88ff85, #20d3a8)
- Smooth continuous animations at 60fps
- Hardware-accelerated 3D graphics rendering

✅ **Dotted Grid Pattern Overlay**
- Canva-style dotted grid for spatial awareness
- Subtle opacity (30%) with green dots
- Fixed position overlay above shader gradient
- 24px × 24px grid spacing

✅ **Widget Selection States**
- Click widget to select (green 2px border)
- "Selected" badge appears at top-left
- Visual feedback for active widget
- Click canvas background to deselect

✅ **Smart Canvas Control**
- Canvas panning automatically disables when widget selected
- Prevents accidental canvas movement during widget editing
- Dragging disabled when widget selected (resize-only mode)
- Canvas panning disabled during widget resize

✅ **Performance Optimization**
- useCallback wrapping for handleSearch, handleDelete, handleWidgetClick, handleCanvasClick
- useMemo for widgets object and filtered activeWidgets list
- Prevents unnecessary re-renders
- Smooth interactions without lag

### Changed
🎨 **Visual Updates**
- Background: Static green gradient → Animated 3D ShaderGradient
- Widget borders: Responsive to selection state (1px gray vs 2px green)
- Delete button: Added stopPropagation to prevent selection toggle
- Overall theme: More dynamic and professional appearance

⚙️ **Technical Updates**
- Installed: @shadergradient/react, three, @react-three/fiber, @react-three/drei, @react-spring/three
- Added selectedWidget state variable
- Implemented handleCanvasClick for deselection
- Updated isDraggable logic based on selection state
- Added canvas-background class for click target detection

### Fixed
🔧 **Interaction Logic**
- Canvas no longer pans while widget is selected
- Widget dragging properly disabled during selection
- Delete button doesn't trigger selection when clicked
- Selection state properly cleared on widget deletion

## [v3.1] - 2025-01-17 - Final Polish

### Added
✅ **Source Citations**
- Bottom section with circular source indicators
- Color-coded sources (green, blue, purple)
- Source count display
- Non-blocking fixed position

✅ **Return to Center Button**
- Green highlighted button (bottom-right)
- Instant return to canvas center
- Always accessible

✅ **Green Central Theme**
- Soft green gradient background (green-50 → emerald-50 → teal-50)
- Green accents throughout UI
- Green primary buttons

### Fixed
🔧 **Canvas Movement**
- Disabled velocity panning (less sensitive)
- Background stays still while resizing widgets
- Smoother, more controlled movement
- Added `draggableCancel` to prevent resize interference

🔧 **Content Blocking**
- Fixed widget layout structure
- Separated header, content, and footer sections
- Content area now properly scrollable
- Bottom citations don't block text

🔧 **Widget Overflow**
- Changed Card to flex column layout
- Fixed overflow handling on content section
- Added proper scroll behavior

### Changed
🎨 **Visual Updates**
- Background: Blue/purple/pink → Green theme
- Reset button: Gray → Green with white icon
- Widget structure: Single div → Three sections (header/content/footer)

⚙️ **Technical Updates**
- Pan sensitivity reduced (velocityDisabled: true)
- Animation speed decreased (400ms → 200ms)
- Velocity sensitivity lowered (1 → 0.5)

## [v3.0] - 2025-01-17 - Canva-Style Refinements

### Added
✅ **Smooth Canva-Style Zoom**
- Extended zoom range: 0.1x to 8x
- Smooth wheel scrolling with momentum
- Double-click to zoom in
- Velocity-based animations

✅ **Functional Widget Deletion**
- State management for active widgets
- Grid auto-recompacts after deletion
- Smooth widget removal animation

### Fixed
🔧 **Widget Typography**
- Headers enlarged: text-sm → text-base font-semibold
- Icons: Removed gray backgrounds
- Headers: Repositioned to top (not centered)

🔧 **Content Layout**
- Fixed overflow scrolling
- Added proper padding (pb-2)
- Removed bottom text blocking

### Changed
🎨 **Background Gradient**
- Changed from red-orange to blue-purple-pink
- Softer, more professional appearance

## [v2.0] - 2025-01-16 - Lovable-Inspired Design

### Added
✅ **Infinite Canvas**
- Pan in all directions
- Zoom controls (bottom-right)
- Reset view functionality
- react-zoom-pan-pinch integration

✅ **Floating Search Bar**
- Fixed top-center position
- Translucent background (backdrop-blur)
- Pill-shaped design
- Always visible above canvas

✅ **All-Direction Resizing**
- 8 resize handles (n, s, e, w, ne, nw, se, sw)
- Resize from any border or corner
- Visible handles on hover

### Changed
🎨 **Visual Design**
- Red-orange gradient background
- White widgets with gray borders
- Removed widget color backgrounds
- shadcn red delete button

### Removed
❌ **Header Text**
- Removed "Housing Intelligence Grid" title
- Removed "Drag and resize" subtitle

## [v1.0] - 2025-01-15 - Initial MVP

### Added
✅ **Core Features**
- Next.js 15 with Turbopack
- Tailwind CSS v4
- shadcn/ui components
- react-grid-layout
- Basic widget system

✅ **Landing Page**
- Hero section
- CTA button
- Example queries

✅ **Basic Grid**
- 7 widget types
- Manual layout
- Mock data
- Loading states

✅ **Widget Types**
- Safety & Crime
- Budget & Prices
- Student Life
- Transport
- Reviews
- Amenities
- Area Photos

---

## Version Policy

### Major Version (X.0.0)
- Complete redesign or architecture change
- Breaking changes to API
- Major feature additions

### Minor Version (0.X.0)
- New features
- Significant improvements
- Non-breaking changes

### Patch Version (0.0.X)
- Bug fixes
- Small improvements
- Documentation updates

---

## Upcoming Features

### Planned (v4.0)
- [ ] Backend API integration
- [ ] Real Perplexity data
- [ ] Dynamic widget creation
- [ ] Layout persistence
- [ ] User accounts
- [ ] Saved searches
- [ ] Widget templates
- [ ] Export functionality

### Under Consideration
- [ ] Collaborative boards
- [ ] Widget sharing
- [ ] Custom widget types
- [ ] Advanced filtering
- [ ] Data visualization widgets
- [ ] Mobile app
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements

---

**Current Version**: v3.1 (Production Ready)
