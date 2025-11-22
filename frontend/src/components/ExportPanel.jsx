import { Download, FileImage, FileCode, FileText, File } from 'lucide-react'
import { jsPDF } from 'jspdf'

export default function ExportPanel({ flowchartData }) {
  const drawFlowchartToCanvas = () => {
    const nodes = flowchartData.nodes
    const edges = flowchartData.edges
    
    if (!nodes || nodes.length === 0) return null

    // Calculate bounds
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    
    nodes.forEach(node => {
      const x = node.position?.x || 0
      const y = node.position?.y || 0
      minX = Math.min(minX, x - 150)
      minY = Math.min(minY, y - 100)
      maxX = Math.max(maxX, x + 150)
      maxY = Math.max(maxY, y + 100)
    })

    const padding = 50
    const width = maxX - minX + padding * 2
    const height = maxY - minY + padding * 2
    const offsetX = -minX + padding
    const offsetY = -minY + padding

    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.width = width * 2 // 2x for high resolution
    canvas.height = height * 2
    const ctx = canvas.getContext('2d')
    ctx.scale(2, 2)

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // Draw edges first (so they appear behind nodes)
    ctx.strokeStyle = '#64748b'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge[0])
      const targetNode = nodes.find(n => n.id === edge[1])
      
      if (sourceNode && targetNode) {
        const x1 = sourceNode.position.x + offsetX
        const y1 = sourceNode.position.y + offsetY
        const x2 = targetNode.position.x + offsetX
        const y2 = targetNode.position.y + offsetY
        
        // Draw line
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        
        // Draw arrow
        const angle = Math.atan2(y2 - y1, x2 - x1)
        const arrowSize = 10
        ctx.beginPath()
        ctx.moveTo(x2, y2)
        ctx.lineTo(
          x2 - arrowSize * Math.cos(angle - Math.PI / 6),
          y2 - arrowSize * Math.sin(angle - Math.PI / 6)
        )
        ctx.lineTo(
          x2 - arrowSize * Math.cos(angle + Math.PI / 6),
          y2 - arrowSize * Math.sin(angle + Math.PI / 6)
        )
        ctx.closePath()
        ctx.fillStyle = '#64748b'
        ctx.fill()
        
        // Draw label if exists
        if (edge[2]) {
          const midX = (x1 + x2) / 2
          const midY = (y1 + y2) / 2
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(midX - 20, midY - 10, 40, 20)
          ctx.fillStyle = '#475569'
          ctx.font = '600 12px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(edge[2], midX, midY)
        }
      }
    })

    // Draw nodes
    nodes.forEach(node => {
      const x = node.position.x + offsetX
      const y = node.position.y + offsetY
      const text = node.text
      const type = node.type || 'process'
      
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '600 14px sans-serif'
      
      // Set colors based on type
      let bgGradient, borderColor
      
      switch (type) {
        case 'start':
        case 'end':
          bgGradient = ctx.createLinearGradient(x - 60, y - 30, x + 60, y + 30)
          bgGradient.addColorStop(0, '#34d399')
          bgGradient.addColorStop(1, '#10b981')
          borderColor = '#059669'
          // Draw rounded rectangle (pill shape)
          ctx.fillStyle = bgGradient
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.roundRect(x - 60, y - 25, 120, 50, 25)
          ctx.fill()
          ctx.stroke()
          break
          
        case 'decision':
          bgGradient = ctx.createLinearGradient(x - 70, y - 70, x + 70, y + 70)
          bgGradient.addColorStop(0, '#fbbf24')
          bgGradient.addColorStop(1, '#f59e0b')
          borderColor = '#d97706'
          // Draw diamond
          ctx.fillStyle = bgGradient
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(x, y - 60)
          ctx.lineTo(x + 60, y)
          ctx.lineTo(x, y + 60)
          ctx.lineTo(x - 60, y)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
          break
          
        case 'io':
          bgGradient = ctx.createLinearGradient(x - 70, y - 30, x + 70, y + 30)
          bgGradient.addColorStop(0, '#a78bfa')
          bgGradient.addColorStop(1, '#8b5cf6')
          borderColor = '#7c3aed'
          // Draw parallelogram
          ctx.fillStyle = bgGradient
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(x - 60, y - 25)
          ctx.lineTo(x + 70, y - 25)
          ctx.lineTo(x + 60, y + 25)
          ctx.lineTo(x - 70, y + 25)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
          break
          
        default: // process
          bgGradient = ctx.createLinearGradient(x - 70, y - 30, x + 70, y + 30)
          bgGradient.addColorStop(0, '#60a5fa')
          bgGradient.addColorStop(1, '#3b82f6')
          borderColor = '#2563eb'
          // Draw rounded rectangle
          ctx.fillStyle = bgGradient
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.roundRect(x - 70, y - 30, 140, 60, 10)
          ctx.fill()
          ctx.stroke()
          break
      }
      
      // Draw text
      ctx.fillStyle = '#ffffff'
      ctx.fillText(text, x, y)
    })

    return canvas
  }

  const handleExport = async (format) => {
    if (format === 'json') {
      const jsonStr = JSON.stringify(flowchartData, null, 2)
      const jsonBlob = new Blob([jsonStr], { type: 'application/json' })
      const jsonUrl = URL.createObjectURL(jsonBlob)
      downloadFile(jsonUrl, 'flowchart.json')
      return
    }

    try {
      const canvas = drawFlowchartToCanvas()
      if (!canvas) {
        alert('No flowchart to export.')
        return
      }

      if (format === 'png') {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          downloadFile(url, 'flowchart.png')
        }, 'image/png', 1.0)
      } else if (format === 'svg') {
        // For SVG, convert canvas to data URL then download
        const dataUrl = canvas.toDataURL('image/png')
        downloadFile(dataUrl, 'flowchart.png') // Note: Still PNG, true SVG would need different approach
      } else if (format === 'pdf') {
        // Convert canvas to PDF
        const imgData = canvas.toDataURL('image/png')
        
        // Calculate PDF dimensions (A4 or custom based on content)
        const imgWidth = canvas.width / 2 // Divide by 2 because we scaled 2x
        const imgHeight = canvas.height / 2
        
        // Determine orientation and size
        const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait'
        
        // Create PDF with appropriate size
        let pdf
        if (imgWidth > 800 || imgHeight > 1000) {
          // Large flowchart - use custom size
          const pdfWidth = imgWidth * 0.264583 // Convert px to mm (96 DPI)
          const pdfHeight = imgHeight * 0.264583
          pdf = new jsPDF({
            orientation: orientation,
            unit: 'mm',
            format: [pdfWidth, pdfHeight]
          })
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        } else {
          // Standard flowchart - use A4
          pdf = new jsPDF({
            orientation: orientation,
            unit: 'mm',
            format: 'a4'
          })
          
          const pageWidth = orientation === 'landscape' ? 297 : 210
          const pageHeight = orientation === 'landscape' ? 210 : 297
          
          // Calculate scaling to fit page with margins
          const margin = 10
          const maxWidth = pageWidth - (margin * 2)
          const maxHeight = pageHeight - (margin * 2)
          
          const scale = Math.min(
            maxWidth / (imgWidth * 0.264583),
            maxHeight / (imgHeight * 0.264583)
          )
          
          const scaledWidth = (imgWidth * 0.264583) * scale
          const scaledHeight = (imgHeight * 0.264583) * scale
          
          // Center on page
          const x = (pageWidth - scaledWidth) / 2
          const y = (pageHeight - scaledHeight) / 2
          
          pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight)
        }
        
        pdf.save('flowchart.pdf')
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Export failed. Please try again.')
    }
  }

  const downloadFile = (dataUrl, filename) => {
    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    link.click()
    
    setTimeout(() => {
      if (dataUrl.startsWith('blob:')) {
        URL.revokeObjectURL(dataUrl)
      }
    }, 100)
  }

  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Download className="w-4 h-4 text-green-500" />
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Export
        </h3>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => handleExport('png')}
          className="w-full btn-secondary flex items-center justify-center gap-2 text-sm"
        >
          <FileImage className="w-4 h-4" />
          Export as PNG
        </button>
        <button
          onClick={() => handleExport('pdf')}
          className="w-full btn-secondary flex items-center justify-center gap-2 text-sm"
        >
          <File className="w-4 h-4" />
          Export as PDF
        </button>
        <button
          onClick={() => handleExport('svg')}
          className="w-full btn-secondary flex items-center justify-center gap-2 text-sm"
        >
          <FileCode className="w-4 h-4" />
          Export as PNG (High-Res)
        </button>
        <button
          onClick={() => handleExport('json')}
          className="w-full btn-secondary flex items-center justify-center gap-2 text-sm"
        >
          <FileText className="w-4 h-4" />
          Export as JSON
        </button>
      </div>
    </div>
  )
}
