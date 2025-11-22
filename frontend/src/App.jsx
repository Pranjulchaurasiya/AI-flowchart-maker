import { useState, useCallback, useEffect } from 'react'
import { Moon, Sun, Sparkles, FileText, Image as ImageIcon, Wand2 } from 'lucide-react'
import FlowchartCanvas from './components/FlowchartCanvas'
import InputPanel from './components/InputPanel'
import ExportPanel from './components/ExportPanel'
import ExampleChips from './components/ExampleChips'
import { generateFlowchart } from './services/api'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [flowchartData, setFlowchartData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inputMode, setInputMode] = useState('text') // text, prompt, image

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleGenerate = async (input, mode) => {
    setLoading(true)
    try {
      const data = await generateFlowchart(input, mode, orientation)
      setFlowchartData(data)
    } catch (error) {
      console.error('Generation error:', error)
      alert('Failed to generate flowchart. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const [orientation, setOrientation] = useState('horizontal') // horizontal or vertical

  const handleExampleClick = (example) => {
    handleGenerate(example, 'prompt')
  }

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal')
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="glass-card rounded-none border-x-0 border-t-0">
        <div className="max-w-[1920px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Flowchart Maker
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Turn ideas into flowcharts instantly
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleOrientation}
              className="btn-secondary flex items-center gap-2"
              title={`Switch to ${orientation === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
            >
              {orientation === 'horizontal' ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span className="text-xs hidden sm:inline">Vertical</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="text-xs hidden sm:inline">Horizontal</span>
                </>
              )}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn-secondary"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left Panel - Input */}
          <div className="lg:col-span-1 space-y-4 animate-fade-in">
            {/* Mode Selector */}
            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Input Mode
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setInputMode('text')}
                  className={`p-3 rounded-xl transition-all ${
                    inputMode === 'text'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <FileText className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Text</span>
                </button>
                <button
                  onClick={() => setInputMode('prompt')}
                  className={`p-3 rounded-xl transition-all ${
                    inputMode === 'prompt'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Wand2 className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">AI</span>
                </button>
                <button
                  onClick={() => setInputMode('image')}
                  className={`p-3 rounded-xl transition-all ${
                    inputMode === 'image'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <ImageIcon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Image</span>
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <InputPanel
              mode={inputMode}
              onGenerate={handleGenerate}
              loading={loading}
            />

            {/* Example Chips */}
            <ExampleChips onExampleClick={handleExampleClick} />

            {/* Export Panel */}
            {flowchartData && (
              <ExportPanel flowchartData={flowchartData} />
            )}
          </div>

          {/* Right Panel - Canvas */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="glass-card rounded-2xl p-4 h-[calc(100vh-8rem)]">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Generating your flowchart...
                    </p>
                  </div>
                </div>
              ) : flowchartData ? (
                <FlowchartCanvas
                  data={flowchartData}
                  onDataChange={setFlowchartData}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                      Ready to Create?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Choose an input mode and start creating beautiful flowcharts with AI assistance.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
