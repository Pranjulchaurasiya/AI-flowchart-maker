import base64
from io import BytesIO
from reportlab.lib.pagesizes import letter, A4
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from typing import List, Dict

def export_to_png(nodes: List[Dict], edges: List[Dict]) -> str:
    """Export flowchart as base64 PNG (placeholder - actual rendering done in frontend)."""
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

def export_to_svg(nodes: List[Dict], edges: List[Dict]) -> str:
    """Generate SVG representation of flowchart."""
    svg_parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">']
    
    # Draw edges
    for edge in edges:
        if len(edge) >= 2:
            from_node = next((n for n in nodes if n["id"] == edge[0]), None)
            to_node = next((n for n in nodes if n["id"] == edge[1]), None)
            
            if from_node and to_node and "position" in from_node and "position" in to_node:
                x1 = from_node["position"]["x"]
                y1 = from_node["position"]["y"] + 30
                x2 = to_node["position"]["x"]
                y2 = to_node["position"]["y"] - 30
                
                svg_parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>')
                
                # Add label if exists
                if len(edge) > 2:
                    label = edge[2]
                    mid_x = (x1 + x2) / 2
                    mid_y = (y1 + y2) / 2
                    svg_parts.append(f'<text x="{mid_x}" y="{mid_y}" fill="#666" font-size="12">{label}</text>')
    
    # Draw nodes
    for node in nodes:
        if "position" in node:
            x = node["position"]["x"]
            y = node["position"]["y"]
            text = node["text"]
            node_type = node.get("type", "process")
            
            if node_type == "decision":
                svg_parts.append(f'<polygon points="{x},{y-40} {x+60},{y} {x},{y+40} {x-60},{y}" fill="#fff" stroke="#333" stroke-width="2"/>')
            else:
                svg_parts.append(f'<rect x="{x-60}" y="{y-30}" width="120" height="60" rx="10" fill="#fff" stroke="#333" stroke-width="2"/>')
            
            svg_parts.append(f'<text x="{x}" y="{y+5}" text-anchor="middle" font-size="14" fill="#333">{text[:20]}</text>')
    
    # Arrow marker
    svg_parts.append('<defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#666"/></marker></defs>')
    
    svg_parts.append('</svg>')
    
    return ''.join(svg_parts)

def export_to_pdf(nodes: List[Dict], edges: List[Dict]) -> str:
    """Generate PDF representation of flowchart."""
    buffer = BytesIO()
    
    # Create PDF
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    
    c.setFont("Helvetica", 12)
    c.drawString(100, height - 50, "AI Flowchart")
    
    # Draw nodes
    y_pos = height - 100
    for node in nodes:
        text = node.get("text", "")
        c.drawString(100, y_pos, f"• {text}")
        y_pos -= 30
    
    c.save()
    
    # Convert to base64
    pdf_bytes = buffer.getvalue()
    buffer.close()
    
    return base64.b64encode(pdf_bytes).decode('utf-8')
