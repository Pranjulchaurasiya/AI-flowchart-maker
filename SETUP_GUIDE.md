# Complete Setup Guide - AI Flowchart Maker

## Prerequisites Installation

### 1. Python 3.8+
Download from: https://www.python.org/downloads/

Verify installation:
```bash
python --version
```

### 2. Node.js 16+
Download from: https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

### 3. Tesseract OCR (for image processing)

**Windows:**
1. Download installer from: https://github.com/UB-Mannheim/tesseract/wiki
2. Run installer and note installation path (e.g., `C:\Program Files\Tesseract-OCR`)
3. Add to system PATH or set in code

**Mac:**
```bash
brew install tesseract
```

**Linux:**
```bash
sudo apt-get install tesseract-ocr
```

Verify installation:
```bash
tesseract --version
```

### 4. Graphviz (for auto-layout)

**Windows:**
Download from: https://graphviz.org/download/
Add to system PATH

**Mac:**
```bash
brew install graphviz
```

**Linux:**
```bash
sudo apt-get install graphviz graphviz-dev
```

## Backend Setup

### Step 1: Navigate to backend folder
```bash
cd backend
```

### Step 2: Create virtual environment
```bash
python -m venv venv
```

### Step 3: Activate virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### Step 4: Install dependencies
```bash
pip install -r requirements.txt
```

**Note:** If `pygraphviz` fails to install:
- Windows: Download wheel from https://www.lfd.uci.edu/~gohlke/pythonlibs/#pygraphviz
- Mac/Linux: Ensure graphviz-dev is installed first

### Step 5: Configure environment variables

Create `.env` file in backend folder:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=8000
```

Get OpenAI API key from: https://platform.openai.com/api-keys

### Step 6: Run the backend server
```bash
python main.py
```

Backend should now be running at: `http://localhost:8000`

Test it by visiting: `http://localhost:8000` in your browser

## Frontend Setup

### Step 1: Open new terminal and navigate to frontend folder
```bash
cd frontend
```

### Step 2: Install dependencies
```bash
npm install
```

This will install:
- React
- Vite
- Tailwind CSS
- React Flow
- Axios
- Lucide React (icons)

### Step 3: Run development server
```bash
npm run dev
```

Frontend should now be running at: `http://localhost:5173`

Your browser should automatically open. If not, visit: `http://localhost:5173`

## Usage

### 1. Text to Flowchart
- Select "Text" mode
- Enter structured text like:
  ```
  Start
  Get user input
  Validate data
  If valid -> Save to database
  Else -> Show error message
  End
  ```
- Click "Generate Flowchart"

### 2. AI Prompt to Flowchart
- Select "AI" mode
- Enter natural language description:
  ```
  Create a flowchart for online food ordering system
  ```
- Click "Generate Flowchart"

### 3. Image to Flowchart
- Select "Image" mode
- Upload image containing flowchart (handwritten, screenshot, etc.)
- Click "Generate Flowchart"

### 4. Edit Flowchart
- Drag nodes to reposition
- Zoom in/out with mouse wheel
- Pan by dragging background
- View minimap for navigation

### 5. Export
- Click export buttons to download as:
  - PNG (image)
  - SVG (vector)
  - JSON (data)

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change PORT in .env file to different number (e.g., 8001)
```

**OpenAI API errors:**
- Verify API key is correct in `.env`
- Check API quota at: https://platform.openai.com/usage
- Ensure billing is set up

**Tesseract not found:**
```python
# Add to image_processor.py:
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

**Module not found:**
```bash
pip install --upgrade -r requirements.txt
```

### Frontend Issues

**Port 5173 in use:**
```bash
# Edit vite.config.js and change port number
```

**CORS errors:**
- Ensure backend is running
- Check API_BASE_URL in `src/services/api.js`

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Build

### Backend
```bash
# Use production ASGI server
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend
```bash
npm run build
# Serve dist folder with nginx or any static server
```

## API Documentation

Once backend is running, visit:
`http://localhost:8000/docs`

This provides interactive API documentation with Swagger UI.

## Support

For issues or questions:
1. Check this guide
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify all prerequisites are installed

## Features Checklist

✅ Text to Flowchart
✅ AI Prompt to Flowchart  
✅ Image to Flowchart (OCR)
✅ Auto Layout
✅ Drag & Drop Editing
✅ Zoom & Pan
✅ Dark Mode
✅ Export PNG/SVG/JSON
✅ Example Templates
✅ Modern Glassmorphism UI
✅ Smooth Animations
✅ Responsive Design

Enjoy creating flowcharts! 🎨
