import axios from 'axios'

const API_BASE_URL = const API_BASE_URL = import.meta.env.VITE_API_URL;
  
export const generateFlowchart = async (input, mode, orientation = 'horizontal') => {
  try {
    let endpoint = ''
    let data = null

    switch (mode) {
      case 'text':
        endpoint = '/api/text-to-flowchart'
        data = { text: input, orientation }
        break
      case 'prompt':
        endpoint = '/api/prompt-to-flowchart'
        data = { prompt: input, orientation }
        break
      case 'image':
        endpoint = '/api/image-to-flowchart'
        const formData = new FormData()
        formData.append('file', input)
        formData.append('orientation', orientation)
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
      default:
        throw new Error('Invalid mode')
    }

    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export const exportFlowchart = async (nodes, edges, format) => {
  try {
    const endpoint = `/api/export/${format}`
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
      nodes,
      edges
    })
    return response.data
  } catch (error) {
    console.error('Export Error:', error)
    throw error
  }
}
