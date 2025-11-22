# Complete Installation Guide

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Python 3.8 or higher
- [ ] Node.js 16 or higher
- [ ] npm (comes with Node.js)
- [ ] Tesseract OCR
- [ ] Graphviz
- [ ] OpenAI API key (for AI features)

---

## 🔧 Step-by-Step Installation

### Step 1: Install Python

**Windows:**
1. Download from https://www.python.org/downloads/
2. Run installer
3. ✅ Check "Add Python to PATH"
4. Click "Install Now"

**Mac:**
```bash
brew install python3
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install python3 python3-pip python3-venv
```

**Verify:**
```bash
python --version
# Should show: Python 3.8.x or higher
```

---

### Step 2: Install Node.js

**Windows/Mac:**
1. Download from https://nodejs.org/
2. Run installer
3. Follow installation wizard

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify:**
```bash
node --version
npm --version
```

---

### Step 3: Install Tesseract OCR

**Windows:**
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Run `tesseract-ocr-w64-setup-v5.3.0.exe`
3. Note installation path (default: `C:\Program Files\Tesseract-OCR`)
4. Add to system PATH:
   - Right-click "This PC" → Properties
   - Advanced system settings → Environment Variables
   - Edit "Path" → Add `C:\Program Files\Tesseract-OCR`

**Mac:**
```bash
brew install tesseract
```

**Linux:**
```bash
sudo apt-get install tesseract-ocr
sudo apt-get install libtesseract-dev
```

**Verify:**
```bash
tesseract --version
```

---

### Step 4: Install Graphviz

**Windows:**
1. Download from: https://graphviz.org/download/
2. Run installer
3. Add to system PATH (similar to Tesseract)

**Mac:**
```bash
brew install graphviz
```

**Linux:**
```bash
sudo apt-get install graphviz graphviz-dev
```

**Verify:**
```bash
dot -V
```

---

### Step 5: Get OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Save it securely (you'll need it later)

**Note:** You need to add billing information to use the API.

---

### Step 6: Clone/Download Project

**Option A: Git Clone**
```bash
git clone <repository-url>
cd ai-flowchart-maker
```

**Option B: Download ZIP**
1. Download project ZIP
2. Extract to desired location
3. Open terminal in project folder

---

### Step 7: Backend Setup

#### 7.1 Navigate to backend
```bash
cd backend
```

#### 7.2 Create virtual environment
```bash
python -m venv venv
```

#### 7.3 Activate virtual environment

**Windows (CMD):**
```bash
venv\Scripts\activate
```

**Windows (PowerShell):**
```bash
venv\Scripts\Activate.ps1
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

#### 7.4 Install Python packages
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**If pygraphviz fails:**

**Windows:**
1. Download wheel from: https://www.lfd.uci.edu/~gohlke/pythonlibs/#pygraphviz
2. Install: `pip install pygraphviz-1.11-cp311-cp311-win_amd64.whl`

**Mac/Linux:**
```bash
pip install pygraphviz --install-option="--include-path=/usr/local/include/graphviz" --install-option="--library-path=/usr/local/lib/graphviz"
```

#### 7.5 Configure environment

Create `.env` file in `backend` folder:
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
PORT=8000
```

#### 7.6 Test backend
```bash
python main.py
```

You should see:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Open browser: http://localhost:8000
You should see: `{"message": "AI Flowchart Maker API", "status": "running"}`

**Keep this terminal open!**

---

### Step 8: Frontend Setup

#### 8.1 Open NEW terminal

Navigate to frontend folder:
```bash
cd frontend
```

#### 8.2 Install Node packages
```bash
npm install
```

This will install:
- React
- Vite
- Tailwind CSS
- React Flow
- Axios
- Other dependencies

**If you get errors:**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 8.3 Start development server
```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Browser should automatically open to http://localhost:5173

---

## ✅ Verification

### Backend Check
- [ ] Terminal shows "Uvicorn running"
- [ ] http://localhost:8000 shows API message
- [ ] http://localhost:8000/docs shows Swagger UI

### Frontend Check
- [ ] Browser opens automatically
- [ ] You see "AI Flowchart Maker" header
- [ ] UI looks modern with glassmorphism
- [ ] No console errors (press F12)

### Full System Check
1. Select "Text" mode
2. Enter:
   ```
   Start
   Process data
   End
   ```
3. Click "Generate Flowchart"
4. Flowchart should appear on right side

---

## 🎉 Success!

You now have a fully working AI Flowchart Maker!

### Next Steps:
1. Try different input modes
2. Test AI prompt generation
3. Upload an image
4. Export flowcharts
5. Toggle dark mode

---

## 🐛 Troubleshooting

### Backend won't start

**"Port 8000 already in use"**
```bash
# Change port in .env
PORT=8001
```

**"Module not found"**
```bash
pip install -r requirements.txt --upgrade
```

**"OpenAI API error"**
- Check API key in `.env`
- Verify billing at https://platform.openai.com/usage
- Check API key permissions

### Frontend won't start

**"Port 5173 already in use"**
Edit `vite.config.js`:
```javascript
server: {
  port: 5174  // Change to different port
}
```

**"Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS errors

- Ensure backend is running
- Check `API_BASE_URL` in `frontend/src/services/api.js`
- Verify it matches backend URL

### Tesseract not found

Add to `backend/services/image_processor.py` (line 6):
```python
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

### Image upload fails

- Check file size (< 10MB)
- Verify Tesseract is installed
- Check backend terminal for errors

---

## 📚 Additional Resources

- **Quick Start**: See `QUICK_START.md`
- **Features**: See `FEATURES.md`
- **Setup Guide**: See `SETUP_GUIDE.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`

---

## 🆘 Still Having Issues?

1. Check both terminal windows for errors
2. Check browser console (F12)
3. Verify all prerequisites are installed
4. Try restarting both servers
5. Check firewall/antivirus settings

---

## 🚀 Quick Commands Reference

**Start Backend:**
```bash
cd backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
python main.py
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

**Or use convenience scripts:**
- Windows: Double-click `start-backend.bat` and `start-frontend.bat`
- Mac/Linux: `./start-backend.sh` and `./start-frontend.sh`

---

**Happy Flowcharting! 🎨**
