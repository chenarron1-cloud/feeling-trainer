import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import JudgeModeScreen from './screens/JudgeModeScreen'
import ResultScreen from './screens/ResultScreen'
import TransformModeScreen from './screens/TransformModeScreen'

export default function App() {
  const [mode, setMode] = useState('home') // 'home' | 'judge' | 'result' | 'transform'
  const [judgeResult, setJudgeResult] = useState(null)

  const goHome = () => { setMode('home'); window.scrollTo(0, 0) }
  const startJudge = () => { setMode('judge'); window.scrollTo(0, 0) }
  const startTransform = () => { setMode('transform'); window.scrollTo(0, 0) }
  const finishJudge = (result) => { setJudgeResult(result); setMode('result'); window.scrollTo(0, 0) }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EEF3F7' }}>
      <div className="flex-1 max-w-[1040px] w-full mx-auto px-4 sm:px-6 lg:px-10 pb-6">
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
      <footer className="w-full text-center py-4 pb-6">
        <p className="text-xs text-[#9CA3AF] tracking-wide">＠創新先生　陳建銘</p>
      </footer>
    </div>
  )
}
