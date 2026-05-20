/* ─── SVG Illustrations ──────────────────────────────── */


function JudgeIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="5" y="7" width="23" height="30" rx="5" fill="#D1EDE9" />
      <rect x="9" y="11" width="23" height="30" rx="5" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="13" y="17" width="13" height="3" rx="1.5" fill="#2F8F9D" opacity="0.5" />
      <rect x="13" y="23" width="10" height="2.5" rx="1.25" fill="#667085" opacity="0.35" />
      <rect x="13" y="28" width="11" height="2.5" rx="1.25" fill="#667085" opacity="0.25" />
      <circle cx="28" cy="29" r="6.5" fill="#2F8F9D" />
      <path d="M25.5 29l2 2.2 4-4.2" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TransformIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="3" y="9" width="15" height="22" rx="5" fill="#D1EDE9" />
      <rect x="4" y="10" width="13" height="20" rx="4" fill="#E3F5F3" />
      <circle cx="10.5" cy="20" r="3.5" fill="#2F8F9D" opacity="0.4" />
      <circle cx="10.5" cy="20" r="1.5" fill="#2F8F9D" />
      <rect x="22" y="9" width="15" height="22" rx="5" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="25" y="15" width="9" height="2.5" rx="1.25" fill="#2D3E63" opacity="0.25" />
      <rect x="25" y="20" width="7" height="2" rx="1" fill="#667085" opacity="0.3" />
      <rect x="25" y="25" width="8" height="2" rx="1" fill="#667085" opacity="0.2" />
      <path d="M18.5 19.5h3" stroke="#2F8F9D" strokeWidth="2" strokeLinecap="round" />
      <path d="M19.5 17l2.5 2.5-2.5 2.5" stroke="#2F8F9D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Home Screen ─────────────────────────────────────── */

export default function HomeScreen({ onStartJudge, onStartTransform }) {
  return (
    <div className="pt-8 md:pt-12 lg:pt-16 pb-10">

      {/* Hero Card — centered, max-w-2xl */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 lg:p-10 mb-5 md:mb-6">
        {/* Hero image */}
        <div className="mb-5 md:mb-7 max-w-xs md:max-w-sm mx-auto">
          <img src="/hero.png" alt="需求感受訓練場" className="w-full rounded-2xl shadow-sm" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2540] leading-tight">
            需求感受訓練場
          </h1>
          <p className="text-base md:text-lg font-semibold text-[#1F6F78] mt-2 md:mt-3">
            看懂產品或服務背後真正打動人的感受
          </p>
          <p className="text-sm md:text-base text-[#374151] mt-3 leading-relaxed max-w-xs mx-auto">
            像玩遊戲一樣，訓練你的觀察力、判斷力與創新力。
          </p>
        </div>
        <div className="mt-5 md:mt-6 pt-4 border-t border-[#E2E8F0] text-center">
          <p className="text-xs text-[#9CA3AF] mb-2 tracking-wide">點擊了解更多</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <a
              href="https://www.innovators.tw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#2F8F9D] underline underline-offset-2 hover:text-[#1F6F78] transition-colors"
            >
              創新先生 陳建銘
            </a>
            <span className="text-[#D1D5DB]">｜</span>
            <a
              href="https://www.innovators.tw/blog/problem-analysis-solving-innovation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#2F8F9D] underline underline-offset-2 hover:text-[#1F6F78] transition-colors"
            >
              靈感製造機法則
            </a>
          </div>
        </div>
      </div>

      {/* Mode Cards — 1 col on mobile/tablet, 2 col on desktop */}
      <div className="max-w-2xl lg:max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">

          {/* Judge Mode */}
          <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0">
                <img src="/judge.png" alt="感受判斷" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-[#1F2A37] text-base md:text-lg">感受判斷</p>
                  <span className="text-xs bg-[#E3F5F3] text-[#2F8F9D] font-semibold px-2 py-0.5 rounded-full">
                    30秒10關
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#667085]">挑戰30秒內答對10題才算過關</p>
              </div>
            </div>
            <button
              onClick={onStartJudge}
              className="w-full min-h-[52px] font-bold text-white text-base rounded-xl transition-transform duration-100"
              style={{
                background: 'linear-gradient(180deg, #38C0D0 0%, #2F8F9D 55%, #1F7080 100%)',
                boxShadow: '0 5px 0 #155f67, 0 8px 20px rgba(47,143,157,0.35)',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 0 #155f67, 0 4px 10px rgba(47,143,157,0.25)'
                e.currentTarget.style.transform = 'translateY(3px)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = '0 5px 0 #155f67, 0 8px 20px rgba(47,143,157,0.35)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 5px 0 #155f67, 0 8px 20px rgba(47,143,157,0.35)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              開始 Go
            </button>
          </div>

          {/* Transform Mode */}
          <button
            onClick={onStartTransform}
            className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-5 md:p-6 text-left shadow-sm hover:border-[#2D3E63]/30 hover:shadow-md active:scale-[0.97] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0">
                <img src="/transform.png" alt="感受改造" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-[#1F2A37] text-base md:text-lg">感受改造</p>
                  <span className="text-xs bg-[#EEF3F7] text-[#2D3E63] font-semibold px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                    自由探索
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#667085]">把產品或服務變得更有感</p>
              </div>
              <span className="text-[#667085] text-xl flex-shrink-0">›</span>
            </div>
          </button>

        </div>
      </div>
    </div>
  )
}
