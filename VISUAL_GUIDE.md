# Visual Design Guide - AI Flowchart Maker

## 🎨 Design System

### Color Palette

#### Primary Colors
```
Blue-500:    #0ea5e9  (Primary actions)
Indigo-600:  #0284c7  (Gradients)
Slate-800:   #1e293b  (Dark backgrounds)
White:       #ffffff  (Light backgrounds)
```

#### Node Colors
```
Green:   #10b981  (Start/End nodes)
Blue:    #3b82f6  (Process nodes)
Orange:  #f59e0b  (Decision nodes)
Purple:  #8b5cf6  (I/O nodes)
```

#### Semantic Colors
```
Success: #10b981
Warning: #f59e0b
Error:   #ef4444
Info:    #3b82f6
```

---

## 🖼️ UI Components

### Header
```
┌─────────────────────────────────────────────────────┐
│  [🌟] AI Flowchart Maker          [🌙 Dark Mode]   │
│      Turn ideas into flowcharts instantly            │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Glassmorphism effect
- Logo with gradient
- Title with gradient text
- Dark mode toggle
- Sticky positioning

---

### Input Panel (Left Side)

```
┌─────────────────────────────┐
│  Input Mode                 │
│  ┌───┐ ┌───┐ ┌───┐         │
│  │📝 │ │🪄 │ │🖼️ │         │
│  │Text│ │AI │ │Img│         │
│  └───┘ └───┘ └───┘         │
├─────────────────────────────┤
│  Enter Text / AI Prompt     │
│  ┌─────────────────────┐   │
│  │                     │   │
│  │  [Input Area]       │   │
│  │                     │   │
│  └─────────────────────┘   │
│                             │
│  [✨ Generate Flowchart]    │
├─────────────────────────────┤
│  💡 Quick Examples          │
│  [User login] [ATM]         │
│  [Food order] [Register]    │
├─────────────────────────────┤
│  📤 Export                  │
│  [PNG] [SVG] [JSON]         │
└─────────────────────────────┘
```

---

### Canvas (Right Side)

```
┌─────────────────────────────────────────┐
│                                         │
│         ┌─────────┐                     │
│         │  Start  │  (Green Circle)     │
│         └────┬────┘                     │
│              │                          │
│              ▼                          │
│         ┌─────────┐                     │
│         │ Process │  (Blue Rectangle)   │
│         └────┬────┘                     │
│              │                          │
│              ▼                          │
│            ◆───◆                        │
│           ◆ Valid? ◆  (Orange Diamond) │
│            ◆───◆                        │
│           ╱     ╲                       │
│      Yes ╱       ╲ No                   │
│         ╱         ╲                     │
│        ▼           ▼                    │
│   ┌────────┐  ┌────────┐               │
│   │Success │  │ Error  │               │
│   └───┬────┘  └───┬────┘               │
│       │           │                     │
│       └─────┬─────┘                     │
│             ▼                           │
│        ┌─────────┐                      │
│        │   End   │  (Green Circle)      │
│        └─────────┘                      │
│                                         │
│  [Minimap]  [Controls]                  │
└─────────────────────────────────────────┘
```

---

## 🎭 Node Shapes

### Start/End Node
```
    ╭─────────────╮
    │    Start    │  Green gradient
    ╰─────────────╯  Rounded circle
         ▼
```

### Process Node
```
    ┌─────────────┐
    │   Process   │  Blue gradient
    │    Data     │  Rounded rectangle
    └─────────────┘
         ▼
```

### Decision Node
```
         ◆
        ◆ ◆
       ◆   ◆        Orange gradient
      ◆ Is  ◆       Diamond (rotated)
       ◆ OK? ◆
        ◆ ◆
         ◆
       ╱   ╲
    Yes     No
```

### I/O Node
```
     ╱─────────────╲
    ╱  Read Input   ╲  Purple gradient
    ╲───────────────╱  Parallelogram
         ▼
```

---

## 🎬 Animations

### Fade In
```css
@keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
Duration: 0.5s
```

### Slide Up
```css
@keyframes slideUp {
  0%   { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
Duration: 0.5s
```

### Glow Effect
```css
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.5); }
  50%      { box-shadow: 0 0 30px rgba(14, 165, 233, 0.8); }
}
Duration: 2s infinite
```

### Hover Scale
```css
.node:hover {
  transform: scale(1.05);
  transition: 0.2s;
}
```

---

## 🌈 Glassmorphism Effect

```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
```

**Dark Mode:**
```css
.dark .glass-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(71, 85, 105, 0.5);
}
```

---

## 🎯 Button Styles

### Primary Button
```
┌─────────────────────────┐
│  ✨ Generate Flowchart  │  Gradient background
└─────────────────────────┘  Glow animation
                             Hover: scale(1.05)
```

### Secondary Button
```
┌──────────────┐
│  Export PNG  │  Glass effect
└──────────────┘  Subtle hover
```

### Mode Button (Active)
```
┌─────┐
│ 📝  │  Blue background
│Text │  White text
└─────┘  Shadow
```

### Mode Button (Inactive)
```
┌─────┐
│ 📝  │  Light gray
│Text │  Dark text
└─────┘  No shadow
```

---

## 📐 Layout Grid

### Desktop (1920px)
```
┌────────────────────────────────────────┐
│           Header (Full Width)          │
├──────────┬─────────────────────────────┤
│          │                             │
│  Input   │        Canvas               │
│  Panel   │      (React Flow)           │
│  (33%)   │        (67%)                │
│          │                             │
└──────────┴─────────────────────────────┘
```

### Tablet (768px)
```
┌────────────────────┐
│      Header        │
├────────────────────┤
│   Input Panel      │
│     (100%)         │
├────────────────────┤
│     Canvas         │
│     (100%)         │
└────────────────────┘
```

### Mobile (375px)
```
┌──────────┐
│  Header  │
├──────────┤
│  Input   │
│  Panel   │
├──────────┤
│  Canvas  │
│  (Stack) │
└──────────┘
```

---

## 🎨 Gradient Examples

### Primary Gradient
```css
background: linear-gradient(
  135deg,
  #0ea5e9 0%,
  #0284c7 100%
);
```

### Node Gradients

**Start/End:**
```css
background: linear-gradient(
  135deg,
  #10b981 0%,
  #059669 100%
);
```

**Process:**
```css
background: linear-gradient(
  135deg,
  #3b82f6 0%,
  #2563eb 100%
);
```

**Decision:**
```css
background: linear-gradient(
  135deg,
  #f59e0b 0%,
  #d97706 100%
);
```

**I/O:**
```css
background: linear-gradient(
  135deg,
  #8b5cf6 0%,
  #7c3aed 100%
);
```

---

## 🌙 Dark Mode Colors

### Background
```
Light: linear-gradient(to-br, #f8fafc, #e0f2fe, #e0e7ff)
Dark:  linear-gradient(to-br, #0f172a, #1e293b, #0f172a)
```

### Cards
```
Light: rgba(255, 255, 255, 0.7)
Dark:  rgba(30, 41, 59, 0.7)
```

### Text
```
Light: #1e293b (slate-800)
Dark:  #f1f5f9 (slate-100)
```

### Borders
```
Light: rgba(226, 232, 240, 1)
Dark:  rgba(71, 85, 105, 0.5)
```

---

## 📏 Spacing System

```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
```

---

## 🔤 Typography

### Font Family
```
Primary: system-ui, -apple-system, sans-serif
Mono:    'Courier New', monospace
```

### Font Sizes
```
xs:   12px  (0.75rem)
sm:   14px  (0.875rem)
base: 16px  (1rem)
lg:   18px  (1.125rem)
xl:   20px  (1.25rem)
2xl:  24px  (1.5rem)
3xl:  30px  (1.875rem)
```

### Font Weights
```
normal:    400
medium:    500
semibold:  600
bold:      700
```

---

## 🎯 Interactive States

### Hover
```css
.button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
```

### Active
```css
.button:active {
  transform: scale(0.98);
}
```

### Focus
```css
.input:focus {
  outline: none;
  ring: 2px solid #0ea5e9;
}
```

### Disabled
```css
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 🎪 Loading States

### Spinner
```
    ⟳
   ⟳ ⟳
  ⟳   ⟳   Rotating circle
   ⟳ ⟳    Blue color
    ⟳     Infinite animation
```

### Skeleton
```
┌─────────────────┐
│ ▓▓▓▓▓▓▓▓░░░░░░ │  Animated gradient
│ ▓▓▓▓░░░░░░░░░░ │  Shimmer effect
└─────────────────┘
```

---

## 📱 Responsive Breakpoints

```
sm:  640px   (Mobile landscape)
md:  768px   (Tablet)
lg:  1024px  (Desktop)
xl:  1280px  (Large desktop)
2xl: 1536px  (Extra large)
```

---

## 🎨 Visual Hierarchy

### Primary Elements
- Large size
- Bold weight
- High contrast
- Gradient colors

### Secondary Elements
- Medium size
- Medium weight
- Medium contrast
- Solid colors

### Tertiary Elements
- Small size
- Normal weight
- Low contrast
- Muted colors

---

## ✨ Special Effects

### Shadow Layers
```css
sm:  0 1px 2px rgba(0, 0, 0, 0.05)
md:  0 4px 6px rgba(0, 0, 0, 0.1)
lg:  0 10px 15px rgba(0, 0, 0, 0.1)
xl:  0 20px 25px rgba(0, 0, 0, 0.1)
2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
```

### Blur Effects
```css
backdrop-filter: blur(20px);
filter: blur(8px);
```

### Transitions
```css
transition: all 0.3s ease-in-out;
```

---

## 🎯 Accessibility

### Color Contrast
- Text: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive: Minimum 3:1 ratio

### Focus Indicators
- Visible outline
- High contrast
- 2px minimum width

### Touch Targets
- Minimum 44x44px
- Adequate spacing
- Clear boundaries

---

**Design with purpose, build with passion! 🎨**
