import { useState, useEffect, useRef } from 'react'
import { questions } from '../data/questions'
import { playCorrect, playWrong, playComplete } from '../utils/sound'

const TOTAL_TIME = 30
const PASS_SCORE = 10

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function JudgeModeScreen({ onHome }) {
  const [gamePhase, setGamePhase] = useState('ready') // 'ready' | 'playing' | 'finished'
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [score, setScore] = useState(0)
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const advancingRef = useRef(false)
  const bgmRef = useRef(null)

  // 停止背景音樂
  const stopBgm = () => {
    if (bgmRef.current) {
      bgmRef.current.pause()
      bgmRef.current.currentTime = 0
    }
  }

  // 播放背景音樂
  const playBgm = () => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio('/bgm.m4a')
      bgmRef.current.loop = true
      bgmRef.current.volume = 0.5
    }
    bgmRef.current.currentTime = 0
    bgmRef.current.play().catch(() => {})
  }

  // 離開時停止音樂
  useEffect(() => {
    return () => stopBgm()
  }, [])

  const question = queue[currentIndex]
  const isAnswered = selected !== null
  const isCorrect = isAnswered && question && selected === question.correctOptionId

  const startGame = () => {
    clearInterval(timerRef.current)
    const shuffled = shuffle(questions)
    setQueue(shuffled)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    scoreRef.current = 0
    advancingRef.current = false
    setTimeLeft(TOTAL_TIME)
    setAnimKey((k) => k + 1)
    playBgm()
    setGamePhase('playing')
  }

  useEffect(() => {
    if (gamePhase !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          stopBgm()
          setGamePhase('finished')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [gamePhase])

  const handleSelect = (optionId) => {
    if (advancingRef.current) return
    if (selected === question.correctOptionId) return
    setSelected(optionId)

    if (optionId === question.correctOptionId) {
      playCorrect()
      advancingRef.current = true
      const newScore = scoreRef.current + 1
      scoreRef.current = newScore
      setScore(newScore)

      if (newScore >= PASS_SCORE) {
        clearInterval(timerRef.current)
        stopBgm()
        setTimeout(() => {
          playComplete()
          setGamePhase('finished')
          advancingRef.current = false
        }, 500)
        return
      }

      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % queue.length)
        setSelected(null)
        setAnimKey((k) => k + 1)
        advancingRef.current = false
      }, 450)
    } else {
      playWrong()
    }
  }

  const timerColor =
    timeLeft > 15 ? '#2F8F9D' : timeLeft > 8 ? '#F59E0B' : '#EF4444'

  /* ── READY ── */
  if (gamePhase === 'ready') {
    return (
      <div className="max-w-xl lg:max-w-2xl mx-auto pt-6 md:pt-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={onHome}
            className="text-[#667085] text-sm py-1 -ml-1 hover:text-[#1F2A37] transition-colors"
          >
            ← 回首頁
          </button>
          <span className="text-xs font-bold text-[#2F8F9D] bg-[#E3F5F3] px-3 py-1.5 rounded-full">
            感受判斷
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 md:p-12 text-center">
          <div className="text-6xl md:text-7xl mb-5">⏱️</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F2A37] mb-3">
            30 秒挑戰
          </h2>
          <p className="text-[#667085] text-sm md:text-base mb-1">
            題目隨機出現，答對自動進入下一題
          </p>
          <p className="text-[#1F6F78] font-bold text-base md:text-lg mb-8">
            30 秒內答對 10 題就過關！
          </p>

          <button
            onClick={startGame}
            className="w-full min-h-[60px] font-bold text-white text-xl rounded-2xl transition-transform duration-100 active:translate-y-1"
            style={{
              background: 'linear-gradient(180deg, #38C0D0 0%, #2F8F9D 55%, #1F7080 100%)',
              boxShadow: '0 6px 0 #155f67, 0 10px 24px rgba(47,143,157,0.35)',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 0 #155f67, 0 4px 12px rgba(47,143,157,0.25)'
              e.currentTarget.style.transform = 'translateY(4px)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 0 #155f67, 0 10px 24px rgba(47,143,157,0.35)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 0 #155f67, 0 10px 24px rgba(47,143,157,0.35)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            開始 Go
          </button>
        </div>
      </div>
    )
  }

  /* ── FINISHED ── */
  if (gamePhase === 'finished') {
    const passed = scoreRef.current >= PASS_SCORE
    return (
      <div className="max-w-xl lg:max-w-2xl mx-auto pt-6 md:pt-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={onHome}
            className="text-[#667085] text-sm py-1 -ml-1 hover:text-[#1F2A37] transition-colors"
          >
            ← 回首頁
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 md:p-12 text-center animate-fade-in">
          <div className="text-6xl md:text-7xl mb-5">{passed ? '🎉' : '💪'}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F2A37] mb-3">
            {passed ? '恭喜過關！' : '時間到！'}
          </h2>
          <p className="text-[#667085] text-base md:text-lg mb-1">
            {passed
              ? `你在時限內答對了 ${scoreRef.current} 題！`
              : `你答對了 ${scoreRef.current} / ${PASS_SCORE} 題`}
          </p>
          {!passed && (
            <p className="text-sm text-[#9CA3AF] mb-8">再差一點就過關了，再試一次！</p>
          )}
          {passed && (
            <p className="text-sm text-[#9CA3AF] mb-8">感受力超強，繼續挑戰吧！</p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={startGame}
              className="w-full min-h-[56px] font-bold text-white text-base md:text-lg rounded-2xl transition-transform duration-100 active:translate-y-1"
              style={{
                background: 'linear-gradient(180deg, #38C0D0 0%, #2F8F9D 55%, #1F7080 100%)',
                boxShadow: '0 6px 0 #155f67, 0 10px 24px rgba(47,143,157,0.35)',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 0 #155f67, 0 4px 12px rgba(47,143,157,0.25)'
                e.currentTarget.style.transform = 'translateY(4px)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 0 #155f67, 0 10px 24px rgba(47,143,157,0.35)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 0 #155f67, 0 10px 24px rgba(47,143,157,0.35)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              再挑戰一次
            </button>
            <button
              onClick={onHome}
              className="w-full py-3 text-[#667085] font-medium text-sm md:text-base hover:text-[#1F2A37] transition-colors"
            >
              回首頁
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── PLAYING ── */
  if (!question) return null

  return (
    <div className="max-w-xl lg:max-w-2xl mx-auto pt-6 md:pt-8">

      {/* Top nav */}
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <button
          onClick={onHome}
          className="text-[#667085] text-sm py-1 -ml-1 hover:text-[#1F2A37] transition-colors"
        >
          ← 回首頁
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#2F8F9D] bg-[#E3F5F3] px-3 py-1.5 rounded-full">
            ✓ {score} / {PASS_SCORE}
          </span>
          <span
            className="text-lg font-black tabular-nums px-4 py-1.5 rounded-full border-2 transition-colors duration-300"
            style={{
              color: timerColor,
              borderColor: timerColor,
              backgroundColor: `${timerColor}18`,
            }}
          >
            {timeLeft}s
          </span>
        </div>
      </div>

      <div className="animate-slide-up" key={animKey}>

        {/* Product card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-7 md:p-9 mb-4 text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#E3F5F3] border border-[#2F8F9D]/10 flex items-center justify-center mx-auto mb-4 text-4xl md:text-5xl overflow-hidden">
            {question.iconImg
              ? <img src={question.iconImg} alt={question.productName} className="w-full h-full object-cover" />
              : question.icon}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1F2A37] mb-2">
            {question.productName}
          </h2>
          <p className="text-sm md:text-base text-[#667085] font-medium">
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-4">
          {question.options.map((option) => {
            let cardStyle = 'bg-white border border-[#E2E8F0] text-[#1F2A37] hover:border-[#2F8F9D] hover:bg-[#F6F9FB] active:scale-[0.98] shadow-sm'
            let badgeStyle = 'bg-[#E3F5F3] text-[#2F8F9D]'

            if (selected === option.id) {
              if (isCorrect) {
                cardStyle = 'bg-[#2F8F9D] border border-[#2F8F9D] text-white animate-bounce-once'
              } else {
                cardStyle = 'bg-rose-400 border border-rose-400 text-white animate-shake'
              }
              badgeStyle = 'bg-white/20 text-white'
            } else if (isCorrect) {
              cardStyle = 'bg-white border border-[#E2E8F0] text-[#667085] opacity-40'
            }

            const badgeLabel =
              selected === option.id
                ? option.id === question.correctOptionId ? '✓' : '✗'
                : option.id.toUpperCase()

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={isCorrect}
                className={`w-full min-h-[64px] px-5 rounded-2xl text-left transition-all duration-200 ${cardStyle}`}
              >
                <div className="flex items-center gap-4 py-1">
                  <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0 transition-all ${badgeStyle}`}>
                    {badgeLabel}
                  </div>
                  <span className="font-semibold text-base md:text-lg leading-tight">
                    {option.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Wrong feedback */}
        {isAnswered && !isCorrect && (
          <div className="rounded-2xl px-5 py-4 bg-rose-50 border border-rose-100 animate-fade-in">
            <p className="text-sm md:text-base font-medium text-rose-600 leading-relaxed">
              {question.wrongFeedback}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
