# Project Structure

```
ai-flowchart-maker/
│
├── backend/                          # Python FastAPI Backend
│   ├── services/                     # Core business logic
│   │   ├── text_parser.py           # Parse text into flowchart
│   │   ├── ai_generator.py          # AI prompt to flowchart (OpenAI)
│   │   ├── image_processor.py       # OCR image to flowchart
│   │   ├── layout_engine.py         # Auto-layout with NetworkX
│   │   └── export_service.py        # Export to PNG/SVG/PDF
│   │
│   ├── main.py                       # FastAPI app & routes
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment variables template
│   └── .env                          # Your API keys (create this)
│
├── frontend/                         # React + Vite Frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── FlowchartCanvas.jsx  # Main canvas with React Flow
│   │   │   ├── CustomNode.jsx       # Custom node shapes
│   │   │   ├── InputPanel.jsx       # Input form
│   │   │   ├── ExportPanel.jsx      # Export buttons
│   │   │   └── ExampleChips.jsx     # Quick example buttons
│   │   │
│   │   ├── services/
│   │   │   └── api.js               # API calls to backend
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Tailwind styles
│   │
│   ├── index.html                    # HTML template
│   ├── package.json                  # Node dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── README.md                         # Project overview
├── SETUP_GUIDE.md                    # Detailed setup instructions
├── PROJECT_STRUCTURE.md              # This file
├── .gitignore                        # Git ignore rules
├── start-backend.bat                 # Windows backend launcher
├── start-frontend.bat                # Windows frontend launcher
├── start-backend.sh                  # Mac/Linux backend launcher
└── start-frontend.sh                 # Mac/Linux frontend launcher
```

## Key Technologies

### Backend
- **FastAPI**: Modern Python web framework
- **OpenAI API**: AI-powered flowchart generation
- **Tesseract + OpenCV**: OCR for image processing
- **NetworkX**: Graph algorithms for layout
- **Graphviz**: Node positioning
- **ReportLab**: PDF generation

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool & dev server
- **Tailwind CSS**: Utility-first styling
- **React Flow**: Flowchart rendering & interaction
- **Axios**: HTTP client
- **Lucide React**: Icon library
- **html-to-image**: Export functionality

## Data Flow

1. **User Input** → Frontend (InputPanel)
2. **API Request** → Backend (FastAPI)
3. **Processing**:
   - Text: Parse with regex
   - Prompt: OpenAI API
   - Image: Tesseract OCR
4. **Layout** → NetworkX + Graphviz
5. **Response** → JSON (nodes + edges + positions)
6. **Render** → React Flow canvas
7. **Export** → PNG/SVG/JSON

## API Endpoints

- `POST /api/text-to-flowchart` - Text input
- `POST /api/prompt-to-flowchart` - AI prompt
- `POST /api/image-to-flowchart` - Image upload
- `POST /api/export/png` - Export PNG
- `POST /api/export/svg` - Export SVG
- `POST /api/export/pdf` - Export PDF

## Node Types

- **start**: Green rounded (Start/Begin)
- **end**: Green rounded (End/Finish)
- **process**: Blue rectangle (Actions)
- **decision**: Orange diamond (Yes/No questions)
- **io**: Purple parallelogram (Input/Output)

## Features

✅ Multiple input methods (text, AI, image)
✅ Automatic layout generation
✅ Interactive drag-and-drop editing
✅ Zoom and pan controls
✅ Dark mode toggle
✅ Export to multiple formats
✅ Quick example templates
✅ Modern glassmorphism UI
✅ Smooth animations
✅ Responsive design
✅ Real-time preview
