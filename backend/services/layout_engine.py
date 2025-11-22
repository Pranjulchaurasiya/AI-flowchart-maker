import networkx as nx
from typing import Dict, List

def apply_auto_layout(flowchart_data: Dict, orientation: str = 'horizontal') -> Dict:
    """
    Apply automatic layout to flowchart nodes using hierarchical positioning.
    
    Args:
        flowchart_data: Dictionary containing nodes and edges
        orientation: 'horizontal' (left-to-right) or 'vertical' (top-to-bottom)
    """
    nodes = flowchart_data.get("nodes", [])
    edges = flowchart_data.get("edges", [])
    
    if not nodes:
        return flowchart_data
    
    # Create directed graph
    G = nx.DiGraph()
    
    # Add nodes
    for node in nodes:
        G.add_node(node["id"])
    
    # Add edges
    for edge in edges:
        if len(edge) >= 2:
            G.add_edge(edge[0], edge[1])
    
    # Try to use hierarchical layout
    try:
        # Find root nodes (nodes with no incoming edges)
        root_nodes = [n for n in G.nodes() if G.in_degree(n) == 0]
        if not root_nodes:
            root_nodes = [nodes[0]["id"]]
        
        # Calculate levels using BFS
        levels = {}
        visited = set()
        current_level = root_nodes
        level = 0
        
        while current_level:
            next_level = []
            for node in current_level:
                if node not in visited:
                    levels[node] = level
                    visited.add(node)
                    next_level.extend(G.successors(node))
            current_level = next_level
            level += 1
        
        # Assign positions based on levels and orientation
        level_counts = {}
        for node_id, node_level in levels.items():
            if node_level not in level_counts:
                level_counts[node_level] = 0
            level_counts[node_level] += 1
        
        level_positions = {}
        for node_id, node_level in levels.items():
            if node_level not in level_positions:
                level_positions[node_level] = 0
            
            total_at_level = level_counts[node_level]
            position_at_level = level_positions[node_level]
            
            if orientation == 'horizontal':
                # HORIZONTAL LAYOUT (Left to Right)
                # X increases with level, Y for multiple nodes at same level
                x = 150 + node_level * 300
                
                if total_at_level == 1:
                    y = 250  # Center single nodes
                else:
                    # Distribute multiple nodes vertically
                    y = 150 + (position_at_level * 200)
            else:
                # VERTICAL LAYOUT (Top to Bottom)
                # Y increases with level, X for multiple nodes at same level
                y = 100 + node_level * 150
                
                if total_at_level == 1:
                    x = 400  # Center single nodes
                else:
                    # Distribute multiple nodes horizontally
                    x = 200 + (position_at_level * 250)
            
            # Update node with position
            for node in nodes:
                if node["id"] == node_id:
                    node["position"] = {"x": x, "y": y}
                    break
            
            level_positions[node_level] += 1
        
        # Handle nodes not in levels (disconnected)
        for node in nodes:
            if "position" not in node:
                node["position"] = {"x": 250, "y": 100}
    
    except Exception as e:
        print(f"Layout error: {e}")
        # Fallback to simple layout based on orientation
        for i, node in enumerate(nodes):
            if orientation == 'horizontal':
                node["position"] = {
                    "x": 150 + i * 300,
                    "y": 250
                }
            else:
                node["position"] = {
                    "x": 400,
                    "y": 100 + i * 150
                }
    
    return {
        "nodes": nodes,
        "edges": edges
    }
