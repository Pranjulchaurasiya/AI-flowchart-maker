import { useCallback, useMemo } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'

const nodeTypes = {
  custom: CustomNode
}

export default function FlowchartCanvas({ data, onDataChange }) {
  const initialNodes = useMemo(() => {
    return data.nodes.map(node => ({
      id: node.id,
      type: 'custom',
      position: node.position || { x: 250, y: 100 },
      data: {
        label: node.text,
        nodeType: node.type || 'process'
      }
    }))
  }, [data])

  const initialEdges = useMemo(() => {
    return data.edges.map((edge, index) => ({
      id: `e${edge[0]}-${edge[1]}-${index}`,
      source: edge[0],
      target: edge[1],
      label: edge[2] || '',
      type: 'smoothstep',
      animated: true,
      style: { 
        stroke: '#64748b', 
        strokeWidth: 2.5
      },
      labelStyle: {
        fill: '#475569',
        fontWeight: 600,
        fontSize: 12
      },
      labelBgStyle: {
        fill: '#ffffff',
        fillOpacity: 0.9
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#64748b',
        width: 20,
        height: 20
      }
    }))
  }, [data])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.3,
          includeHiddenNodes: false,
          minZoom: 0.5,
          maxZoom: 1.5
        }}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#94a3b8"
          gap={16}
          size={1}
          className="dark:opacity-20"
        />
        <Controls className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg" />
        <MiniMap
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg"
          nodeColor={(node) => {
            switch (node.data.nodeType) {
              case 'start':
              case 'end':
                return '#10b981'
              case 'decision':
                return '#f59e0b'
              case 'io':
                return '#8b5cf6'
              default:
                return '#3b82f6'
            }
          }}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  )
}
