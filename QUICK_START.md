# Quick Start Guide ⚡

## 🚀 Fast Setup (5 minutes)

### 1. Install Prerequisites
- Python 3.8+ → https://www.python.org/downloads/
- Node.js 16+ → https://nodejs.org/
- Tesseract OCR → https://github.com/UB-Mannheim/tesseract/wiki
- Graphviz → https://graphviz.org/download/

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
```

Create `backend/.env`:
```
OPENAI_API_KEY=sk-your-key-here
PORT=8000
```

Start backend:
```bash
python main.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open Browser
Visit: `http://localhost:5173`

## 🎯 Quick Test

1. Select "AI" mode
2. Type: "Create flowchart for user login"
3. Click "Generate Flowchart"
4. See your flowchart appear!

## 🔧 Common Issues

### "Module not found"
```bash
pip install -r requirements.txt --upgrade
```

### "Port already in use"
Change port in `.env` or `vite.config.js`

### "OpenAI API error"
- Check API key in `.env`
- Verify billing at https://platform.openai.com/

### "Tesseract not found"
Add to `image_processor.py`:
```python
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

## 📝 Example Inputs

### Text Mode
```
Start
Get user credentials
Validate credentials
If valid -> Grant access
Else -> Show error
End
```

### AI Mode
```
Create a flowchart for ATM withdrawal process
```

### Image Mode
Upload any flowchart image (screenshot, photo, PDF)

## 🎨 Features

- ✏️ Drag nodes to reposition
- 🔍 Zoom with mouse wheel
- 🖱️ Pan by dragging background
- 🌙 Toggle dark mode
- 📤 Export PNG/SVG/JSON
- 🎯 Click example chips for quick start

## 📚 Full Documentation

See `SETUP_GUIDE.md` for detailed instructions.

## 🆘 Need Help?

1. Check browser console (F12)
2. Check terminal for errors
3. Verify all prerequisites installed
4. Review `SETUP_GUIDE.md`

---

**Ready to create amazing flowcharts!** 🎉
