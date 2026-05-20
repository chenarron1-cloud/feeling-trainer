import { useState } from 'react'
import { questions } from '../data/questions'
import { playTap } from '../utils/sound'

export default function TransformModeScreen({ onHome }) {
  const [phase, setPhase] = useState('list')
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [selectedTransform, setSelectedTransform] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const next = (newPhase, updates = {}) => {
    if (updates.question !== undefined) setSelectedQuestion(updates.question)
    if (updates.transform !== undefined) setSelectedTransform(updates.transform)
    setShowDetails(false)
    setPhase(newPhase)
    setAnimKey((k) => k + 1)
    window.scrollTo(0, 0)
  }

  const backLabel =
    phase === 'list' ? '← 回首頁' : phase === 'pick' ? '← 選其他產品' : '← 換個感受'

  const handleBack = () => {
    if (phase === 'list') onHome()
    else if (phase === 'pick') next('list')
    else next('pick')
  }

  return (
    <div className="max-w-xl lg:max-w-2xl mx-auto pt-6 md:pt-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <button
          onClick={handleBack}
          className="text-[#667085] text-sm py-1 -ml-1 hover:text-[#1F2A37] transition-colors"
        >
          {backLabel}
        </button>
        <span className="text-xs font-bold text-[#2D3E63] bg-[#EEF3F7] border border-[#E2E8F0] px-3 py-1.5 rounded-full tracking-wide">
          感受改造
        </span>
      </div>

      <div className="animate-slide-up" key={animKey}>

        {/* ── LIST ── */}
        {phase === 'list' && (
          <div>
            <div className="mb-5 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#1F2A37]">選一個產品</h2>
              <p className="text-xs md:text-sm text-[#667085] mt-1">
                找到它的核心感受，然後加入新的感受。
              </p>
            </div>
            {/* 2-col on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => { playTap(); next('pick', { question: q }) }}
                  className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-4 md:p-5 text-left hover:border-[#2F8F9D] hover:shadow-md active:scale-[0.97] transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#E3F5F3] border border-[#2F8F9D]/10 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 overflow-hidden">
                      {q.iconImg
                        ? <img src={q.iconImg} alt={q.productName} className="w-full h-full object-cover" />
                        : q.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1F2A37] text-sm md:text-base">{q.productName}</p>
                      <span className="inline-block text-xs text-[#2F8F9D] bg-[#E3F5F3] px-2 py-0.5 rounded-full mt-1 font-medium">
                        {q.coreFeeling}
                      </span>
                    </div>
                    <span className="text-[#2F8F9D] text-xl flex-shrink-0">›</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PICK ── */}
        {phase === 'pick' && selectedQuestion && (
          <div>
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-6 text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#E3F5F3] border border-[#2F8F9D]/10 flex items-center justify-center text-4xl md:text-5xl mx-auto mb-4 overflow-hidden">
                {selectedQuestion.iconImg
                  ? <img src={selectedQuestion.iconImg} alt={selectedQuestion.productName} className="w-full h-full object-cover" />
                  : selectedQuestion.icon}
              </div>
              <h2 className="font-bold text-[#1F2A37] text-lg md:text-xl mb-2">
                {selectedQuestion.productName}
              </h2>
              <div className="inline-flex items-center gap-1.5 bg-[#E3F5F3] text-[#1F6F78] text-xs md:text-sm font-bold px-3 py-1.5 rounded-full">
                <span className="opacity-70">核心感受</span>
                <span>·</span>
                <span>{selectedQuestion.coreFeeling}</span>
              </div>
            </div>

            <p className="text-sm md:text-base font-bold text-[#1F2A37] mb-3 px-1">加入哪種感受？</p>
            <div className="space-y-3">
              {selectedQuestion.transformationOptions.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => { playTap(); next('result', { transform: opt }) }}
                  className="w-full min-h-[64px] bg-white rounded-2xl border border-[#E2E8F0] shadow-sm px-5 text-left hover:border-[#2F8F9D] hover:shadow-md active:scale-[0.97] transition-all duration-200"
                >
                  <div className="flex items-center gap-4 py-1">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#E3F5F3] flex items-center justify-center font-bold text-[#2F8F9D] flex-shrink-0 text-sm md:text-base">
                      {['A', 'B', 'C'][i]}
                    </div>
                    <span className="font-bold text-[#1F2A37] text-base md:text-lg">{opt.label}</span>
                    <span className="ml-auto text-[#2F8F9D] text-xl flex-shrink-0">›</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === 'result' && selectedQuestion && selectedTransform && (
          <div>
            {/* Formula chips */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs md:text-sm font-bold text-[#1F2A37] bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-full shadow-sm">
                {selectedQuestion.coreFeeling}
              </span>
              <span className="text-[#2F8F9D] font-bold text-lg">×</span>
              <span className="text-xs md:text-sm font-bold text-[#1F2A37] bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-full shadow-sm">
                {selectedTransform.label}
              </span>
            </div>

            {/* Hero card */}
            <div
              className="rounded-3xl p-7 md:p-9 mb-4 text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #2D3E63 0%, #2F8F9D 100%)' }}
            >
              <p className="text-xs md:text-sm font-bold opacity-60 mb-2 tracking-widest uppercase">
                創新方向
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
                {selectedTransform.innovationTitle}
              </h2>
              <p className="text-sm md:text-base opacity-85 leading-relaxed">
                {selectedTransform.oneLiner}
              </p>
            </div>

            {/* Expand toggle */}
            <button
              onClick={() => setShowDetails((v) => !v)}
              className="w-full min-h-[52px] bg-white rounded-2xl border border-[#E2E8F0] shadow-sm text-center text-[#2F8F9D] font-bold text-sm md:text-base hover:bg-[#F6F9FB] active:scale-[0.98] transition-all duration-150 mb-4"
            >
              {showDetails ? '▲ 收起設計細節' : '▼ 看更多設計'}
            </button>

            {/* Details */}
            {showDetails && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 animate-fade-in space-y-5 mb-4">
                <DetailRow label="產品概念" text={selectedTransform.details.concept} />
                <div className="h-px bg-[#F6F9FB]" />
                <DetailRow label="使用方式" text={selectedTransform.details.usage} />
                <div className="h-px bg-[#F6F9FB]" />
                <DetailRow label="感受設計" text={selectedTransform.details.feelingDesign} />
                <div className="bg-[#F6F9FB] border border-[#E2E8F0] rounded-2xl p-4 md:p-5">
                  <p className="text-xs md:text-sm font-bold text-[#2F8F9D] uppercase tracking-widest mb-2">
                    文案亮點
                  </p>
                  <p className="text-base md:text-lg font-bold text-[#2D3E63] italic leading-relaxed">
                    「{selectedTransform.details.copywriting}」
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="space-y-3">
              <button
                onClick={() => next('pick')}
                className="w-full min-h-[56px] text-white font-bold rounded-2xl active:scale-95 transition-all duration-150 text-base md:text-lg"
                style={{
                  backgroundColor: '#2F8F9D',
                  boxShadow: '0 4px 16px rgba(47,143,157,0.25)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1F6F78')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2F8F9D')}
              >
                換個感受試試
              </button>
              <button
                onClick={() => next('list')}
                className="w-full py-3 text-[#667085] font-medium text-sm md:text-base hover:text-[#1F2A37] transition-colors"
              >
                換個產品
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function DetailRow({ label, text }) {
  return (
    <div>
      <p className="text-xs md:text-sm font-bold text-[#2F8F9D] uppercase tracking-widest mb-1.5">
        {label}
      </p>
      <p className="text-sm md:text-base text-[#1F2A37] leading-relaxed opacity-80">{text}</p>
    </div>
  )
}
