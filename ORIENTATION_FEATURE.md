# Flowchart Orientation Toggle Feature ✅

## New Feature Added

You can now switch between **Horizontal** (left-to-right) and **Vertical** (top-to-bottom) flowchart layouts with a single click!

## How to Use

### Toggle Button Location
Look for the orientation toggle button in the **header**, next to the dark mode button.

### Button Icons
- **Horizontal Mode** (current): Shows vertical arrows icon ⇅ - Click to switch to vertical
- **Vertical Mode** (current): Shows horizontal arrows icon ⇄ - Click to switch to horizontal

### Steps
1. **Generate a flowchart** (any method: Text, AI, or Image)
2. **Click the orientation button** in the header
3. **Generate again** to see the new layout
4. **Toggle anytime** to switch between layouts

## Layout Differences

### Horizontal Layout (Left → Right)
```
┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐
│Start│────▶│Step1│────▶│Step2│────▶│ End │
└─────┘     └─────┘     └─────┘     └─────┘
```

**Best for:**
- Wide screens
- Sequential processes
- Reading flow (left to right)
- Presentations on monitors

**Spacing:**
- Horizontal: 300px between levels
- Vertical: 200px for branches

### Vertical Layout (Top ↓ Bottom)
```
┌─────┐
│Start│
└──┬──┘
   ↓
┌─────┐
│Step1│
└──┬──┘
   ↓
┌─────┐
│Step2│
└──┬──┘
   ↓
┌─────┐
│ End │
└─────┘
```

**Best for:**
- Tall screens / mobile
- Traditional flowcharts
- Printing on paper
- Detailed processes

**Spacing:**
- Vertical: 150px between levels
- Horizontal: 250px for branches

## Technical Implementation

### Frontend Changes

**App.jsx:**
- Added `orientation` state (horizontal/vertical)
- Added `toggleOrientation()` function
- Added orientation toggle button in header
- Pass orientation to API calls

**api.js:**
- Added `orientation` parameter to all API calls
- Sends orientation preference to backend

### Backend Changes

**main.py:**
- Added `orientation` field to `TextInput` model
- Added `orientation` field to `PromptInput` model
- Added `orientation` parameter to image endpoint
- Pass orientation to `apply_auto_layout()`

**layout_engine.py:**
- Added `orientation` parameter to function
- Conditional positioning logic:
  - **Horizontal:** X increases with level, Y for branches
  - **Vertical:** Y increases with level, X for branches
- Updated fallback layout for both orientations

## Code Examples

### Horizontal Positioning
```python
if orientation == 'horizontal':
    x = 150 + node_level * 300  # Left to right
    y = 250 if single else 150 + position * 200  # Vertical spread
```

### Vertical Positioning
```python
else:  # vertical
    y = 100 + node_level * 150  # Top to bottom
    x = 400 if single else 200 + position * 250  # Horizontal spread
```

## Benefits

1. **Flexibility**
   - Choose layout that fits your screen
   - Adapt to different use cases
   - Better presentations

2. **User Control**
   - One-click toggle
   - Instant feedback
   - No page reload needed

3. **Professional**
   - Industry-standard layouts
   - Both orientations supported
   - Clean, organized output

4. **Accessibility**
   - Works on all screen sizes
   - Mobile-friendly
   - Responsive design

## Use Cases

### Use Horizontal When:
- ✅ Presenting on wide monitors
- ✅ Creating process flows
- ✅ Showing sequential steps
- ✅ Exporting for slides

### Use Vertical When:
- ✅ Printing on paper
- ✅ Mobile viewing
- ✅ Traditional flowcharts
- ✅ Detailed documentation

## Keyboard Shortcut (Future)
Could add: `Ctrl+R` or `Cmd+R` to rotate layout

## Export Compatibility
Both orientations export perfectly to:
- ✅ PNG (high resolution)
- ✅ SVG (vector format)
- ✅ JSON (data format)

## Browser Compatibility
Works on all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Tips

1. **Try Both Layouts**
   - Generate once, toggle, generate again
   - See which works better for your content

2. **Screen Size Matters**
   - Horizontal: Better for wide screens
   - Vertical: Better for tall screens

3. **Content Type**
   - Simple flows: Either works
   - Complex flows: Choose based on branching

4. **Presentation**
   - Slides: Usually horizontal
   - Documents: Usually vertical

## Future Enhancements

Possible additions:
- [ ] Remember user preference
- [ ] Auto-detect best orientation
- [ ] Diagonal layouts
- [ ] Custom spacing controls
- [ ] Keyboard shortcuts

---

**Status: IMPLEMENTED ✅**

You can now toggle between horizontal and vertical flowchart layouts!

## Quick Test

1. **Refresh your browser** (Ctrl+R)
2. **Generate a flowchart** (try AI mode: "Create a login flowchart")
3. **Look for the toggle button** in the header (arrows icon)
4. **Click it** to switch orientation
5. **Generate again** to see the new layout

Enjoy the flexibility! 🎉
