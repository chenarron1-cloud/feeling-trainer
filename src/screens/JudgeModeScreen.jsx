import { useState } from 'react'
import { questions } from '../data/questions'
import { playCorrect, playWrong, playComplete } from '../utils/sound'

export default function JudgeModeScreen({ onFinish, onHome }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [triedWrong, setTriedWrong] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const question = questions[currentIndex]
  const isCorrect = selected === question.correctOptionId
  const isAnswered = selected !== null

  const handleSelect = (optionId) => {
    if (isAnswered && isCorrect) return
    setSelected(optionId)
    setShowExplanation(false)
    if (optionId === question.correctOptionId) {
      playCorrect()
      if (!triedWrong) setCorrectCount((prev) => prev + 1)
    } else {
      playWrong()
      setTriedWrong(true)
    }
  }

  const handleRetry = () => { setSelected(null); setShowExplanation(false) }

  const handleNext = () => {
    if (currentIndex >= questions.length - 1) {
      playComplete()
      onFinish({ correctCount, total: questions.length })
    } else {
      setCurrentIndex((prev) => prev + 1)
      setSelected(null)
      setTriedWrong(false)
      setShowExplanation(false)
      setAnimKey((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const getOptionCardStyle = (optionId) => {
    if (!isAnswered) {
      return 'bg-white border border-[#E2E8F0] text-[#1F2A37] hover:border-[#2F8F9D] hover:bg-[#F6F9FB] active:scale-[0.98] shadow-sm'
    }
    if (optionId === selected) {
      return isCorrect
        ? 'bg-[#2F8F9D] border border-[#2F8F9D] text-white animate-bounce-once'
        : 'bg-rose-400 border border-rose-400 text-white animate-shake'
    }
    return 'bg-white border border-[#E2E8F0] text-[#667085] opacity-40'
  }

  const getBadgeStyle = (optionId) => {
    if (!isAnswered) return 'bg-[#E3F5F3] text-[#2F8F9D]'
    if (optionId === selected) return 'bg-white/20 text-white'
    return 'bg-[#F6F9FB] text-[#667085]'
  }

  const getBadgeLabel = (optionId) => {
    if (isAnswered && selected === optionId) return isCorrect ? '✓' : '✗'
    return optionId.toUpperCase()
  }

  return (
    /* Centered column, max 640px on desktop */
    <div className="max-w-xl lg:max-w-2xl mx-auto pt-6 md:pt-8">

      {/* Top nav */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <button
          onClick={onHome}
          className="text-[#667085] text-sm py-1 -ml-1 hover:text-[#1F2A37] transition-colors"
        >
          ← 回首頁
        </button>
        <span className="text-xs font-bold text-[#2F8F9D] bg-[#E3F5F3] px-3 py-1.5 rounded-full">
          關卡 {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-7 md:mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentIndex ? '20px' : '8px',
              height: '8px',
              backgroundColor: i <= currentIndex ? '#2F8F9D' : '#E2E8F0',
              opacity: i < currentIndex ? 0.4 : 1,
            }}
          />
        ))}
      </div>

      <div className="animate-slide-up" key={animKey}>

        {/* Product card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-7 md:p-9 mb-4 md:mb-5 text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#E3F5F3] border border-[#2F8F9D]/10 flex items-center justify-center mx-auto mb-4 text-4xl md:text-5xl overflow-hidden">
            {question.iconImg
              ? <img src={question.iconImg} alt={question.productName} className="w-full h-full object-cover" />
              : question.icon}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1F2A37] mb-1 md:mb-2">
            {question.productName}
          </h2>
          {question.learnMoreUrl && (
            <a
              href={question.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold text-[#2F8F9D] underline underline-offset-2 hover:text-[#1F6F78] transition-colors mb-2"
            >
              點擊了解更多
            </a>
          )}
          <p className="text-sm md:text-base text-[#667085] font-medium">{question.question}</p>
        </div>

        {/* Option cards — min-h-[64px] for comfortable tap */}
        <div className="space-y-3 md:space-y-4 mb-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered && isCorrect}
              className={`w-full min-h-[64px] px-5 rounded-2xl text-left transition-all duration-200 ${getOptionCardStyle(option.id)}`}
            >
              <div className="flex items-center gap-4 py-1">
                <div
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-sm md:text-base font-bold flex-shrink-0 transition-all ${getBadgeStyle(option.id)}`}
                >
                  {getBadgeLabel(option.id)}
                </div>
                <span className="font-semibold text-base md:text-lg leading-tight">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div
            className={`rounded-2xl px-5 py-4 mb-3 animate-fade-in ${
              isCorrect
                ? 'bg-[#E3F5F3] border border-[#2F8F9D]/20'
                : 'bg-rose-50 border border-rose-100'
            }`}
          >
            <p className={`text-sm md:text-base font-medium leading-relaxed ${isCorrect ? 'text-[#1F6F78]' : 'text-rose-600'}`}>
              {isCorrect ? question.correctFeedback : question.wrongFeedback}
            </p>
          </div>
        )}

        {/* Explanation toggle */}
        {isAnswered && isCorrect && (
          <div className="mb-4">
            <button
              onClick={() => setShowExplanation((v) => !v)}
              className="w-full text-xs md:text-sm text-[#667085] py-2 flex items-center justify-center gap-1 hover:text-[#2F8F9D] transition-colors"
            >
              {showExplanation ? '▲ 收起解析' : '▼ 看完整解析'}
            </button>
            {showExplanation && (
              <div className="bg-[#F6F9FB] border border-[#E2E8F0] rounded-2xl px-5 py-4 animate-fade-in">
                <p className="text-xs md:text-sm text-[#1F2A37] leading-relaxed opacity-75">
                  {question.fullExplanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action button */}
        {isAnswered && (
          <div className="animate-fade-in mt-2">
            {isCorrect ? (
              <button
                onClick={handleNext}
                className="w-full min-h-[56px] text-white font-bold rounded-2xl active:scale-95 transition-all duration-150 text-base md:text-lg"
                style={{
                  backgroundColor: '#2F8F9D',
                  boxShadow: '0 4px 16px rgba(47,143,157,0.28)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1F6F78')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2F8F9D')}
              >
                {currentIndex >= questions.length - 1 ? '查看成果 🎉' : '下一關 →'}
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full min-h-[56px] bg-white border border-[#E2E8F0] text-[#667085] font-bold rounded-2xl hover:bg-[#F6F9FB] active:scale-95 transition-all duration-150 text-base md:text-lg shadow-sm"
              >
                再選一次
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
