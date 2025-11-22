import { Lightbulb } from 'lucide-react'

const examples = [
  'User login system',
  'ATM withdrawal process',
  'Online food ordering',
  'Student registration',
  'E-commerce checkout'
]

export default function ExampleChips({ onExampleClick }) {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-yellow-500" />
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Quick Examples
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-200 dark:border-blue-800 rounded-full text-blue-700 dark:text-blue-300 transition-all hover:scale-105"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}
