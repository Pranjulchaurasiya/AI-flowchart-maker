import re
from typing import Dict, List, Tuple

def parse_text_to_flowchart(text: str) -> Dict:
    """
    Parse structured text into flowchart nodes and edges.
    Supports formats like:
    - Start
    - Get user input
    - Validate data
    - If valid -> Save to DB
    - Else -> Error
    - End
    """
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    nodes = []
    edges = []
    node_id = 1
    node_map = {}
    last_node_id = None
    condition_stack = []
    
    for line in lines:
        # Remove bullet points and numbering
        line = re.sub(r'^[-*•]\s*', '', line)
        line = re.sub(r'^\d+\.\s*', '', line)
        
        # Check for conditional branches
        if '->' in line:
            parts = line.split('->')
            condition = parts[0].strip()
            action = parts[1].strip() if len(parts) > 1 else ""
            
            # Create condition node if not exists
            if condition.lower() not in [n['text'].lower() for n in nodes]:
                node_type = 'decision' if any(kw in condition.lower() for kw in ['if', 'check', 'validate', '?']) else 'process'
                nodes.append({
                    "id": str(node_id),
                    "text": condition,
                    "type": node_type
                })
                node_map[condition.lower()] = str(node_id)
                
                if last_node_id:
                    edges.append([last_node_id, str(node_id)])
                
                condition_stack.append(str(node_id))
                last_node_id = str(node_id)
                node_id += 1
            
            # Create action node
            if action:
                node_type = get_node_type(action)
                nodes.append({
                    "id": str(node_id),
                    "text": action,
                    "type": node_type
                })
                
                if condition_stack:
                    edges.append([condition_stack[-1], str(node_id), "yes"])
                
                last_node_id = str(node_id)
                node_id += 1
        
        elif line.lower().startswith(('else', 'otherwise', 'no')):
            # Handle else branch
            action = re.sub(r'^(else|otherwise|no)[:\s]*', '', line, flags=re.IGNORECASE).strip()
            if action:
                node_type = get_node_type(action)
                nodes.append({
                    "id": str(node_id),
                    "text": action,
                    "type": node_type
                })
                
                if condition_stack:
                    edges.append([condition_stack[-1], str(node_id), "no"])
                    condition_stack.pop()
                
                last_node_id = str(node_id)
                node_id += 1
        
        else:
            # Regular node
            node_type = get_node_type(line)
            nodes.append({
                "id": str(node_id),
                "text": line,
                "type": node_type
            })
            
            if last_node_id:
                edges.append([last_node_id, str(node_id)])
            
            last_node_id = str(node_id)
            node_id += 1
    
    return {
        "nodes": nodes,
        "edges": edges
    }

def get_node_type(text: str) -> str:
    """Determine node type based on text content."""
    text_lower = text.lower()
    
    if any(kw in text_lower for kw in ['start', 'begin']):
        return 'start'
    elif any(kw in text_lower for kw in ['end', 'finish', 'stop', 'exit']):
        return 'end'
    elif any(kw in text_lower for kw in ['if', 'check', 'validate', 'verify', '?', 'decision']):
        return 'decision'
    elif any(kw in text_lower for kw in ['input', 'output', 'print', 'display', 'show', 'read', 'get']):
        return 'io'
    else:
        return 'process'
