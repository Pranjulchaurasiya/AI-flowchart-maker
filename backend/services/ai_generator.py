import os
import json
from typing import Dict

# Lazy initialization - client will be created when first needed
client = None
AI_AVAILABLE = False

def get_groq_client():
    """Get or create Groq client."""
    global client, AI_AVAILABLE
    
    if client is not None:
        return client
    
    try:
        from groq import Groq
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment")
        client = Groq(api_key=api_key)
        AI_AVAILABLE = True
        print("✅ Groq AI client initialized successfully")
        return client
    except Exception as e:
        print(f"⚠️ Groq AI initialization failed: {e}")
        print("AI prompt generation will use fallback mode")
        AI_AVAILABLE = False
        return None

def generate_flowchart_from_prompt(prompt: str) -> Dict:
    """
    Use Groq AI to generate flowchart structure from natural language prompt.
    """
    
    system_prompt = """You are a flowchart generation expert. Given a user's description, generate a structured flowchart.

Return ONLY a valid JSON object with this exact structure:
{
  "nodes": [
    {"id": "1", "text": "Start", "type": "start"},
    {"id": "2", "text": "Process step", "type": "process"},
    {"id": "3", "text": "Decision?", "type": "decision"},
    {"id": "4", "text": "End", "type": "end"}
  ],
  "edges": [
    ["1", "2"],
    ["2", "3"],
    ["3", "4", "yes"]
  ]
}

Node types: start, end, process, decision, io
Edge format: [from_id, to_id] or [from_id, to_id, label]

Rules:
- Always start with a "Start" node (type: start)
- Always end with an "End" node (type: end)
- Use "decision" type for yes/no questions
- Use "io" type for input/output operations
- Use "process" type for actions/operations
- Keep text concise and clear
- Create logical flow with proper connections"""

    try:
        # Get Groq client (lazy initialization)
        groq_client = get_groq_client()
        
        if not groq_client:
            raise Exception("Groq AI client not available")
            
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # Fast and powerful Groq model
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Create a flowchart for: {prompt}"}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        content = response.choices[0].message.content.strip()
        
        # Extract JSON from markdown code blocks if present
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
        
        result = json.loads(content)
        
        # Validate structure
        if "nodes" not in result or "edges" not in result:
            raise ValueError("Invalid response structure")
        
        return result
        
    except Exception as e:
        # Fallback to basic structure if API fails
        print(f"AI generation error: {e}")
        return {
            "nodes": [
                {"id": "1", "text": "Start", "type": "start"},
                {"id": "2", "text": prompt[:50], "type": "process"},
                {"id": "3", "text": "End", "type": "end"}
            ],
            "edges": [["1", "2"], ["2", "3"]]
        }
