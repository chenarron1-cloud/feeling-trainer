import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import JudgeModeScreen from './screens/JudgeModeScreen'
import ResultScreen from './screens/ResultScreen'
import TransformModeScreen from './screens/TransformModeScreen'
import { isSoundEnabled, toggleSound } from './utils/sound'

function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={enabled ? '關閉音效' : '開啟音效'}
      className="fixed bottom-5 right-4 z-50 w-9 h-9 rounded-full bg-white border border-[#E2E8F0] shadow-md flex items-center justify-center text-[#667085] hover:text-[#2F8F9D] hover:border-[#2F8F9D] transition-colors"
    >
      {enabled ? (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
          <path d="M3 7.5h3l4-3v9l-4-3H3V7.5z" fill="currentColor" />
          <path d="M13.5 7c.8.8 1.2 1.8 1.2 3s-.4 2.2-1.2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
          <path d="M3 7.5h3l4-3v9l-4-3H3V7.5z" fill="currentColor" />
          <path d="M14 7.5l3 5M17 7.5l-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}

export default function App() {
  const [mode, setMode] = useState('home') // 'home' | 'judge' | 'result' | 'transform'
  const [judgeResult, setJudgeResult] = useState(null)
  const [soundEnabled, setSoundEnabled] = useState(isSoundEnabled)

  const handleToggleSound = () => {
    const next = toggleSound()
    setSoundEnabled(next)
  }

  const goHome = () => { setMode('home'); window.scrollTo(0, 0) }
  const startJudge = () => { setMode('judge'); window.scrollTo(0, 0) }
  const startTransform = () => { setMode('transform'); window.scrollTo(0, 0) }
  const finishJudge = (result) => { setJudgeResult(result); setMode('result'); window.scrollTo(0, 0) }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EEF3F7' }}>
      <SoundToggle enabled={soundEnabled} onToggle={handleToggleSound} />
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-10 pb-20">
        <div className="animate-fade-in" key={mode}>
          {mode === 'home' && (
            <HomeScreen onStartJudge={startJudge} onStartTransform={startTransform} />
          )}
          {mode === 'judge' && (
            <JudgeModeScreen onFinish={finishJudge} onHome={goHome} />
          )}
          {mode === 'result' && (
            <ResultScreen
              result={judgeResult}
              onReplay={startJudge}
              onTransform={startTransform}
              onHome={goHome}
            />
          )}
          {mode === 'transform' && (
            <TransformModeScreen onHome={goHome} />
          )}
        </div>
      </div>
    </div>
  )
}
