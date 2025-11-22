import cv2
import pytesseract
import numpy as np
from PIL import Image
import io
from typing import Dict, List
import re

def process_image_to_flowchart(image_bytes: bytes) -> Dict:
    """
    Process uploaded image to extract flowchart structure using OCR.
    """
    try:
        # Convert bytes to image
        image = Image.open(io.BytesIO(image_bytes))
        img_array = np.array(image)
        
        # Convert to grayscale
        if len(img_array.shape) == 3:
            gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
        else:
            gray = img_array
        
        # Apply thresholding
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Detect contours (potential flowchart boxes)
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Extract text from entire image
        text = pytesseract.image_to_string(image)
        
        # Parse extracted text into nodes
        nodes = []
        edges = []
        node_id = 1
        
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        
        # Filter out noise and short fragments
        lines = [line for line in lines if len(line) > 2]
        
        last_node_id = None
        
        for line in lines:
            # Clean up OCR artifacts
            line = re.sub(r'[^\w\s\-\?\.]', '', line)
            
            if not line:
                continue
            
            # Determine node type
            node_type = get_node_type_from_text(line)
            
            nodes.append({
                "id": str(node_id),
                "text": line,
                "type": node_type
            })
            
            # Create sequential edges
            if last_node_id:
                edges.append([last_node_id, str(node_id)])
            
            last_node_id = str(node_id)
            node_id += 1
        
        # Ensure we have at least start and end
        if not nodes:
            nodes = [
                {"id": "1", "text": "Start", "type": "start"},
                {"id": "2", "text": "Process", "type": "process"},
                {"id": "3", "text": "End", "type": "end"}
            ]
            edges = [["1", "2"], ["2", "3"]]
        elif len(nodes) == 1:
            nodes.append({"id": "2", "text": "End", "type": "end"})
            edges.append(["1", "2"])
        
        return {
            "nodes": nodes,
            "edges": edges
        }
        
    except Exception as e:
        print(f"Image processing error: {e}")
        # Return basic fallback structure
        return {
            "nodes": [
                {"id": "1", "text": "Start", "type": "start"},
                {"id": "2", "text": "Extracted from image", "type": "process"},
                {"id": "3", "text": "End", "type": "end"}
            ],
            "edges": [["1", "2"], ["2", "3"]]
        }

def get_node_type_from_text(text: str) -> str:
    """Determine node type from OCR text."""
    text_lower = text.lower()
    
    if any(kw in text_lower for kw in ['start', 'begin']):
        return 'start'
    elif any(kw in text_lower for kw in ['end', 'finish', 'stop']):
        return 'end'
    elif '?' in text or any(kw in text_lower for kw in ['if', 'check', 'decision']):
        return 'decision'
    elif any(kw in text_lower for kw in ['input', 'output', 'read', 'write', 'print']):
        return 'io'
    else:
        return 'process'
