# Changelog

All notable changes to the Housing Intelligence Grid project.

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
