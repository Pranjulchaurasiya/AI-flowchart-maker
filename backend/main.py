from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import uvicorn

from services.text_parser import parse_text_to_flowchart
from services.ai_generator import generate_flowchart_from_prompt
from services.image_processor import process_image_to_flowchart
from services.layout_engine import apply_auto_layout
from services.export_service import export_to_png, export_to_svg, export_to_pdf

load_dotenv()

app = FastAPI(title="AI Flowchart Maker API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str
    orientation: str = 'horizontal'

class PromptInput(BaseModel):
    prompt: str
    orientation: str = 'horizontal'

class ExportInput(BaseModel):
    nodes: list
    edges: list

@app.get("/")
async def root():
    return {"message": "AI Flowchart Maker API", "status": "running"}

@app.post("/api/text-to-flowchart")
async def text_to_flowchart(input_data: TextInput):
    try:
        result = parse_text_to_flowchart(input_data.text)
        result = apply_auto_layout(result, input_data.orientation)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/prompt-to-flowchart")
async def prompt_to_flowchart(input_data: PromptInput):
    try:
        result = generate_flowchart_from_prompt(input_data.prompt)
        result = apply_auto_layout(result, input_data.orientation)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/image-to-flowchart")
async def image_to_flowchart(file: UploadFile = File(...), orientation: str = 'horizontal'):
    try:
        contents = await file.read()
        result = process_image_to_flowchart(contents)
        result = apply_auto_layout(result, orientation)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/export/png")
async def export_png(data: ExportInput):
    try:
        png_data = export_to_png(data.nodes, data.edges)
        return {"data": png_data, "type": "image/png"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/export/svg")
async def export_svg(data: ExportInput):
    try:
        svg_data = export_to_svg(data.nodes, data.edges)
        return {"data": svg_data, "type": "image/svg+xml"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/export/pdf")
async def export_pdf(data: ExportInput):
    try:
        pdf_data = export_to_pdf(data.nodes, data.edges)
        return {"data": pdf_data, "type": "application/pdf"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
