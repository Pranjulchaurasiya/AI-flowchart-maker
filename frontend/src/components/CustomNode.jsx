import { memo } from 'react'
import { Handle, Position } from 'reactflow'

const CustomNode = ({ data }) => {
  const { label, nodeType } = data

  const getNodeStyle = () => {
    const baseStyle = 'shadow-lg border-2 transition-all duration-200 hover:shadow-xl flex items-center justify-center'
    
    switch (nodeType) {
      case 'start':
      case 'end':
        return `${baseStyle} px-8 py-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-green-600 text-white font-semibold min-w-[120px]`
      case 'decision':
        return `${baseStyle} w-40 h-40 bg-gradient-to-br from-amber-400 to-orange-500 border-orange-600 text-white font-semibold transform rotate-45`
      case 'io':
        return `${baseStyle} px-8 py-4 bg-gradient-to-br from-purple-400 to-violet-500 border-purple-600 text-white font-semibold skew-x-12 min-w-[160px]`
      default:
        return `${baseStyle} px-8 py-4 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 border-blue-600 text-white font-medium min-w-[140px]`
    }
  }

  const getLabelStyle = () => {
    const baseStyle = {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '1.4',
      textAlign: 'center',
      wordBreak: 'break-word',
      maxWidth: '200px',
      padding: '8px'
    }
    
    // Keep text horizontal even in rotated shapes
    if (nodeType === 'decision') {
      return { 
        ...baseStyle, 
        transform: 'rotate(-45deg)',
        minWidth: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
    if (nodeType === 'io') {
      return { 
        ...baseStyle, 
        transform: 'skewX(-12deg)',
        minWidth: '140px'
      }
    }
    return baseStyle
  }

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-slate-400 border-2 border-white"
      />
      
      <div className={getNodeStyle()}>
        <div style={getLabelStyle()}>
          {label}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-slate-400 border-2 border-white"
      />
    </div>
  )
}

export default memo(CustomNode)
