# AI Flowchart Maker 🎨

Turn your ideas into flowcharts instantly using AI.

## Features

- 📝 Text to Flowchart - Parse structured text into flowcharts
- 🤖 AI Prompt to Flowchart - Natural language flowchart generation
- 🖼️ Image to Flowchart - OCR from handwritten/screenshot flowcharts
- 🎨 Beautiful Modern UI - Glassmorphism design with smooth animations
- ✏️ Live Editing - Drag, edit, and customize nodes
- 📤 Export - PNG, SVG, PDF formats
- 🌙 Dark Mode - Toggle between light and dark themes

## Tech Stack

**Backend:**
- Python 3.8+
- FastAPI
- OpenAI API (for AI generation)
- Tesseract OCR + OpenCV (for image processing)
- NetworkX + Graphviz (for auto-layout)

**Frontend:**
- React + Vite
- Tailwind CSS
- React Flow (flowchart rendering)
- Axios (API calls)

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- Tesseract OCR installed

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the server:
```bash
python main.py
```

Backend runs on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Usage

1. Open `http://localhost:5173` in your browser
2. Choose input method:
   - Type or paste text
   - Enter a natural language prompt
   - Upload an image
3. Click "Generate Flowchart"
4. Edit, customize, and export your flowchart

## API Endpoints

- `POST /api/text-to-flowchart` - Convert text to flowchart
- `POST /api/prompt-to-flowchart` - Generate from AI prompt
- `POST /api/image-to-flowchart` - Extract flowchart from image
- `POST /api/export/png` - Export as PNG
- `POST /api/export/svg` - Export as SVG
- `POST /api/export/pdf` - Export as PDF

## License

MIT
