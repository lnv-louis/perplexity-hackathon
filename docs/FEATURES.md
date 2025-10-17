# User Features Guide

## 🎨 Visual Design

### Animated ShaderGradient Background
- **Dynamic 3D Gradient**: WaterPlane shader with continuous animation
- **Green Color Palette**: #dcffdb, #88ff85, #20d3a8 for cohesive theme
- **Hardware Accelerated**: Three.js canvas for smooth 60fps animations
- **Professional Look**: Eye-catching yet subtle background effect

### Dotted Grid Overlay
- **Canva-Style Grid**: Subtle dotted pattern for spatial awareness
- **Semi-Transparent**: Doesn't interfere with content
- **Fixed Position**: Doesn't move with zoom or pan
- **Visual Guide**: Helps align and organize widgets

### Widget Design
- **Smart Borders**: Gray (default) or green 2px border (selected)
- **Selection Badge**: "Selected" indicator appears when clicked
- **Pure White Cards**: Clean, professional appearance
- **Shadow Effects**: Hover shadow for depth
- **Typography**: Professional hierarchy with larger headers

### Interface Elements
- **Search Bar**: Floating translucent pill at top-center
- **Widgets**: Clean white cards with smart selection states
- **Controls**: Bottom-right zoom controls with green "Return to Center" button
- **Sources**: Bottom section with circular colored source indicators

## 🎮 Canvas Navigation

### Pan & Move
- **Click & Drag**: Anywhere on background to move canvas
- **Smart Disabling**: Panning automatically disables when widget is selected
- **Smooth Movement**: Less sensitive, controlled panning
- **No Interference**: Background doesn't move while resizing widgets
- **Click to Deselect**: Click canvas background to deselect any widget

### Zoom Controls
- **Mouse Wheel**: Smooth zoom in/out (0.1x to 8x)
- **Zoom In Button**: [+] button (bottom-right)
- **Zoom Out Button**: [-] button (bottom-right)
- **Return to Center**: [⤢] Green button returns to center view
- **Double Click**: Quick zoom in on any area

### Zoom Range
- **Minimum**: 0.1x (zoom out far, bird's eye view)
- **Maximum**: 8x (zoom in close, detail view)
- **Smooth Scrolling**: Controlled sensitivity like Canva

## 📦 Widget Management

### Widget Selection
1. **Click Widget**: Click anywhere on a widget to select it
2. **Visual Feedback**:
   - Green 2px border appears
   - "Selected" badge shows at top-left
3. **Canvas Protection**: Canvas panning disabled when widget selected
4. **Deselect**: Click canvas background to deselect

### Moving Widgets
1. **Drag Mode**: Active when no widget is selected
2. **Click & Drag** widget header to move
3. **Release** to place in new position
4. **Auto-Recompact**: Grid rearranges automatically
5. **Disabled When Selected**: Select widget for resize-only mode

### Resizing Widgets
1. **Select Widget**: Click widget first to enable precise resizing
2. **Resize Handles**: Available on all 8 positions:
   - Top, Bottom, Left, Right edges
   - All 4 corners (NE, NW, SE, SW)
3. **Click & Drag** handle to resize
4. **Background Stays Still**: Canvas doesn't move while resizing
5. **Min/Max Sizes**: Widgets have minimum dimensions
6. **Precise Control**: Canvas panning disabled during resize

### Deleting Widgets
1. **Hover** over widget
2. **Red X Button** appears (top-right corner)
3. **Click** to remove widget (prevents event bubbling)
4. **Grid Recompacts**: Other widgets fall into place

## 🔍 Search Functionality

### Search Bar Features
- **Fixed Position**: Always visible at top-center
- **Translucent**: See canvas behind it
- **Responsive**: Adapts to screen size
- **Quick Search**: Press Enter or click Search button

### Search Workflow
1. Type query (e.g., "bloomsbury student uni, safe, cheap")
2. Press Enter or click green Search button
3. Loading state with spinner
4. Widgets populate with results

## 📊 Widget Types

### 1. Safety & Crime
- Safety score (0-10)
- Crime statistics
- Neighborhood safety indicators
- Recent incident data

### 2. Budget & Prices
- Average rent prices
- Student housing costs
- Cost comparisons
- Affordability metrics

### 3. Student Life
- University proximity
- Student population %
- Study spaces & cafes
- Student events & activities

### 4. Transport & Commute
- Tube/bus access times
- Transport lines available
- Commute times to key areas
- Night service availability

### 5. Resident Reviews
- Star ratings (1-5)
- Recent testimonials
- Community feedback
- Review timestamps

### 6. Nearby Amenities
- Supermarkets, gyms, cafes
- Distance indicators
- Quick-access tags
- Service availability

### 7. Area Photos
- Neighborhood images
- Street views
- Local landmarks
- Visual references

## 📚 Source Citations

### Bottom Section Icons
- **Circular Indicators**: 3 colored circles showing sources
  - Green circle: Source 1
  - Blue circle: Source 2
  - Purple circle: Source 3
- **Source Count**: "3 sources" text
- **Hover**: Shows source name
- **Click** (TODO): Opens source URL

### Citation Design
- Non-intrusive fixed bottom section
- Doesn't block widget content
- Professional circular design
- Color-coded for quick identification

## ⌨️ Keyboard Shortcuts (Future)

### Navigation
- `Space + Drag`: Pan canvas
- `Ctrl/Cmd + Scroll`: Zoom
- `Ctrl/Cmd + 0`: Reset to center

### Widgets
- `Delete`: Remove selected widget
- `Ctrl/Cmd + D`: Duplicate widget
- `Arrow Keys`: Move selected widget

## 📱 Responsive Design

### Breakpoints
- **Large** (1200px+): 12-column grid
- **Medium** (996px+): 10-column grid
- **Small** (768px+): 6-column grid

### Mobile Adaptations
- Touch-friendly controls
- Larger tap targets
- Single-column widget layout
- Optimized search bar

## 🎯 Best Practices

### Optimal Layout
- Group related widgets together
- Keep frequently-used widgets accessible
- Use zoom for detailed analysis
- Reset to center after exploring

### Performance Tips
- Delete unused widgets to improve performance
- Avoid excessive zooming in/out rapidly
- Use search to refresh stale data
- Keep 5-8 widgets active at once

---

**Enjoy your intelligent housing search!** 🏡
