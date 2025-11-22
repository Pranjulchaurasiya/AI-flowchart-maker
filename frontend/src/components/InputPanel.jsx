import { useState } from 'react'
import { Send, Upload } from 'lucide-react'

export default function InputPanel({ mode, onGenerate, loading }) {
  const [textInput, setTextInput] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = () => {
    if (mode === 'image') {
      if (file) {
        onGenerate(file, mode)
      }
    } else {
      if (textInput.trim()) {
        onGenerate(textInput, mode)
      }
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const getPlaceholder = () => {
    switch (mode) {
      case 'text':
        return 'Enter structured text:\n\nStart\nGet user input\nValidate data\nIf valid -> Save to DB\nElse -> Show error\nEnd'
      case 'prompt':
        return 'Describe your flowchart:\n\ne.g., "Create a flowchart for user login process with authentication"'
      case 'image':
        return 'Upload an image containing a flowchart'
      default:
        return ''
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        {mode === 'text' && 'Enter Text'}
        {mode === 'prompt' && 'AI Prompt'}
        {mode === 'image' && 'Upload Image'}
      </h3>

      {mode === 'image' ? (
        <div>
          <label className="block">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-3 text-slate-400" />
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-500">
                PNG, JPG, PDF up to 10MB
              </p>
              {file && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-3 font-medium">
                  {file.name}
                </p>
              )}
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder={getPlaceholder()}
          className="w-full h-64 px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || (mode === 'image' ? !file : !textInput.trim())}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed animate-glow"
      >
        <Send className="w-5 h-5" />
        {loading ? 'Generating...' : 'Generate Flowchart'}
      </button>
    </div>
  )
}
