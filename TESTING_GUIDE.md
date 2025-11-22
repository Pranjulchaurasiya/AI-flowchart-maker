# Testing Guide - AI Flowchart Maker

## 🧪 Complete Testing Checklist

### Pre-Testing Setup

Ensure both servers are running:
- ✅ Backend: http://localhost:8000
- ✅ Frontend: http://localhost:5173

---

## 1️⃣ Backend API Testing

### Test 1: API Health Check
```bash
# Open browser or use curl
curl http://localhost:8000
```

**Expected Response:**
```json
{
  "message": "AI Flowchart Maker API",
  "status": "running"
}
```

### Test 2: API Documentation
Visit: http://localhost:8000/docs

**Expected:**
- Swagger UI interface
- List of all endpoints
- Interactive API testing

### Test 3: Text to Flowchart API
```bash
curl -X POST http://localhost:8000/api/text-to-flowchart \
  -H "Content-Type: application/json" \
  -d '{"text": "Start\nProcess data\nEnd"}'
```

**Expected Response:**
```json
{
  "nodes": [
    {"id": "1", "text": "Start", "type": "start", "position": {...}},
    {"id": "2", "text": "Process data", "type": "process", "position": {...}},
    {"id": "3", "text": "End", "type": "end", "position": {...}}
  ],
  "edges": [
    ["1", "2"],
    ["2", "3"]
  ]
}
```

### Test 4: AI Prompt API
```bash
curl -X POST http://localhost:8000/api/prompt-to-flowchart \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a simple login flowchart"}'
```

**Expected:**
- Valid JSON response
- Multiple nodes with logical flow
- Start and End nodes present

---

## 2️⃣ Frontend UI Testing

### Test 1: Initial Load
1. Open http://localhost:5173
2. Check for:
   - ✅ Header with logo and title
   - ✅ Dark mode toggle button
   - ✅ Three input mode buttons (Text, AI, Image)
   - ✅ Input panel on left
   - ✅ Empty canvas on right
   - ✅ "Ready to Create?" message

### Test 2: Dark Mode
1. Click moon/sun icon in header
2. Check:
   - ✅ Smooth transition
   - ✅ Colors change appropriately
   - ✅ All text remains readable
   - ✅ Toggle works both ways

### Test 3: Input Mode Switching
1. Click each mode button (Text, AI, Image)
2. Verify:
   - ✅ Button highlights when selected
   - ✅ Input panel changes accordingly
   - ✅ Placeholder text updates
   - ✅ Smooth transitions

---

## 3️⃣ Text to Flowchart Testing

### Test Case 1: Simple Linear Flow
**Input:**
```
Start
Get user input
Process data
Display result
End
```

**Expected:**
- ✅ 5 nodes created
- ✅ Vertical arrangement
- ✅ Connected with arrows
- ✅ Start node is green
- ✅ End node is green
- ✅ Process nodes are blue

### Test Case 2: Conditional Flow
**Input:**
```
Start
Get user credentials
Validate credentials
If valid -> Grant access
Else -> Show error
End
```

**Expected:**
- ✅ Decision node (diamond shape, orange)
- ✅ Two branches from decision
- ✅ "yes" and "no" labels on edges
- ✅ Proper layout

### Test Case 3: Complex Flow
**Input:**
```
Start
Read user input
Check if valid
If valid -> Process data
If valid -> Save to database
If valid -> Send confirmation
Else -> Display error message
Else -> Log error
End
```

**Expected:**
- ✅ Multiple branches
- ✅ Proper node types
- ✅ Logical connections
- ✅ Clean layout

---

## 4️⃣ AI Prompt Testing

### Test Case 1: Simple Prompt
**Input:** "Create a flowchart for user login"

**Expected:**
- ✅ Generates in < 5 seconds
- ✅ Contains Start and End
- ✅ Has login-related steps
- ✅ Includes validation
- ✅ Logical flow

### Test Case 2: Complex Prompt
**Input:** "Create a flowchart for online food ordering system with payment processing"

**Expected:**
- ✅ Multiple decision points
- ✅ Payment-related steps
- ✅ Order confirmation
- ✅ Error handling
- ✅ Comprehensive flow

### Test Case 3: Business Process
**Input:** "ATM withdrawal process with balance check"

**Expected:**
- ✅ Card validation
- ✅ PIN verification
- ✅ Balance check
- ✅ Withdrawal steps
- ✅ Receipt option

---

## 5️⃣ Image Upload Testing

### Test Case 1: Upload Image
1. Click "Image" mode
2. Click upload area
3. Select an image file
4. Click "Generate Flowchart"

**Expected:**
- ✅ File name displays
- ✅ Upload succeeds
- ✅ OCR processes image
- ✅ Flowchart generated
- ✅ Text extracted correctly

### Test Case 2: Drag and Drop
1. Drag image file to upload area
2. Drop file

**Expected:**
- ✅ File accepted
- ✅ Name displays
- ✅ Ready to generate

---

## 6️⃣ Canvas Interaction Testing

### Test 1: Drag Nodes
1. Generate any flowchart
2. Click and drag a node
3. Move to different position
4. Release

**Expected:**
- ✅ Node follows cursor
- ✅ Edges update dynamically
- ✅ Smooth movement
- ✅ Position persists

### Test 2: Zoom Controls
1. Use mouse wheel to zoom in/out
2. Try zoom buttons in controls

**Expected:**
- ✅ Canvas zooms smoothly
- ✅ Nodes scale appropriately
- ✅ Text remains readable
- ✅ Controls work

### Test 3: Pan Canvas
1. Click and drag on empty canvas area
2. Move around

**Expected:**
- ✅ Canvas pans smoothly
- ✅ All nodes move together
- ✅ Minimap updates

### Test 4: Minimap
1. Check minimap in bottom-right
2. Click different areas

**Expected:**
- ✅ Shows overview
- ✅ Clicking navigates
- ✅ Current view highlighted
- ✅ Node colors match

### Test 5: Fit View
1. Zoom and pan randomly
2. Click fit view button

**Expected:**
- ✅ Canvas centers
- ✅ All nodes visible
- ✅ Optimal zoom level

---

## 7️⃣ Export Testing

### Test 1: Export PNG
1. Generate a flowchart
2. Click "Export as PNG"

**Expected:**
- ✅ Download starts
- ✅ File named "flowchart.png"
- ✅ Image contains flowchart
- ✅ Good quality
- ✅ Readable text

### Test 2: Export SVG
1. Click "Export as SVG"

**Expected:**
- ✅ Download starts
- ✅ File named "flowchart.svg"
- ✅ Opens in browser
- ✅ Scalable vector
- ✅ Editable in design tools

### Test 3: Export JSON
1. Click "Export as JSON"

**Expected:**
- ✅ Download starts
- ✅ File named "flowchart.json"
- ✅ Valid JSON format
- ✅ Contains nodes and edges
- ✅ Includes positions

---

## 8️⃣ Example Chips Testing

### Test: Click Each Example
1. Click "User login system"
2. Wait for generation
3. Verify flowchart
4. Repeat for other examples

**Expected for each:**
- ✅ Generates automatically
- ✅ Relevant to topic
- ✅ Complete flow
- ✅ Proper structure

---

## 9️⃣ Error Handling Testing

### Test 1: Empty Input
1. Leave text area empty
2. Click "Generate Flowchart"

**Expected:**
- ✅ Button disabled
- ✅ No API call made
- ✅ No error shown

### Test 2: Invalid API Key
1. Stop backend
2. Try to generate with AI prompt

**Expected:**
- ✅ Error message shown
- ✅ User-friendly message
- ✅ No crash
- ✅ Can retry

### Test 3: Network Error
1. Disconnect internet
2. Try to generate

**Expected:**
- ✅ Error caught
- ✅ Message displayed
- ✅ App remains functional

### Test 4: Large File Upload
1. Try uploading file > 10MB

**Expected:**
- ✅ Validation message
- ✅ Upload rejected
- ✅ Helpful error message

---

## 🔟 Performance Testing

### Test 1: Generation Speed
1. Generate 10 different flowcharts
2. Time each generation

**Expected:**
- ✅ Text: < 1 second
- ✅ AI: < 5 seconds
- ✅ Image: < 3 seconds

### Test 2: Large Flowcharts
**Input:** 20+ nodes

**Expected:**
- ✅ Renders smoothly
- ✅ Drag still responsive
- ✅ Zoom works well
- ✅ Export succeeds

### Test 3: Rapid Switching
1. Switch modes rapidly
2. Generate multiple times quickly

**Expected:**
- ✅ No crashes
- ✅ UI remains responsive
- ✅ Requests handled properly

---

## 1️⃣1️⃣ Responsive Design Testing

### Test 1: Desktop (1920x1080)
**Expected:**
- ✅ Full layout visible
- ✅ Proper spacing
- ✅ All features accessible

### Test 2: Laptop (1366x768)
**Expected:**
- ✅ Layout adjusts
- ✅ No horizontal scroll
- ✅ Readable text

### Test 3: Tablet (768x1024)
**Expected:**
- ✅ Responsive layout
- ✅ Touch-friendly
- ✅ Vertical stacking

### Test 4: Mobile (375x667)
**Expected:**
- ✅ Mobile-optimized
- ✅ Single column
- ✅ Touch controls work

---

## 1️⃣2️⃣ Browser Compatibility

Test in multiple browsers:

### Chrome
- ✅ All features work
- ✅ Smooth animations
- ✅ Export functions

### Firefox
- ✅ All features work
- ✅ Proper rendering
- ✅ Export functions

### Safari
- ✅ All features work
- ✅ iOS compatibility
- ✅ Export functions

### Edge
- ✅ All features work
- ✅ Windows integration
- ✅ Export functions

---

## 🐛 Known Issues & Workarounds

### Issue 1: Tesseract Path (Windows)
**Symptom:** Image upload fails
**Fix:** Add path in `image_processor.py`

### Issue 2: CORS Error
**Symptom:** API calls fail
**Fix:** Ensure backend is running

### Issue 3: OpenAI Rate Limit
**Symptom:** AI generation fails
**Fix:** Wait and retry, check quota

---

## ✅ Testing Checklist Summary

- [ ] Backend API responds
- [ ] Frontend loads correctly
- [ ] Text parsing works
- [ ] AI generation works
- [ ] Image upload works
- [ ] Canvas interactions work
- [ ] Export functions work
- [ ] Dark mode works
- [ ] Examples work
- [ ] Error handling works
- [ ] Performance acceptable
- [ ] Responsive on all devices
- [ ] Works in all browsers

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

Backend Tests: ___/4 passed
Frontend Tests: ___/3 passed
Text Tests: ___/3 passed
AI Tests: ___/3 passed
Image Tests: ___/2 passed
Canvas Tests: ___/5 passed
Export Tests: ___/3 passed
Example Tests: ___/5 passed
Error Tests: ___/4 passed
Performance Tests: ___/3 passed
Responsive Tests: ___/4 passed
Browser Tests: ___/4 passed

Total: ___/43 passed

Issues Found:
1. ___________
2. ___________
3. ___________

Overall Status: [ ] PASS [ ] FAIL
```

---

## 🎯 Acceptance Criteria

Application is ready for production when:
- ✅ All core features work
- ✅ No critical bugs
- ✅ Performance acceptable
- ✅ Error handling robust
- ✅ Documentation complete
- ✅ Export functions work
- ✅ Responsive design works
- ✅ Cross-browser compatible

---

**Happy Testing! 🧪**
