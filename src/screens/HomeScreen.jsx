/* ─── SVG Illustrations ──────────────────────────────── */

function HeroIllustration() {
  return (
    <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <g transform="rotate(-10 75 65)">
        <rect x="14" y="28" width="104" height="70" rx="10" fill="#D1EDE9" />
        <rect x="25" y="43" width="52" height="5" rx="2.5" fill="#2F8F9D" opacity="0.4" />
        <rect x="25" y="53" width="36" height="4" rx="2" fill="#2F8F9D" opacity="0.22" />
        <rect x="25" y="61" width="55" height="3" rx="1.5" fill="#2F8F9D" opacity="0.13" />
      </g>
      <g transform="rotate(9 185 62)">
        <rect x="142" y="22" width="100" height="68" rx="10" fill="#C8D9F2" opacity="0.6" />
        <rect x="153" y="36" width="52" height="5" rx="2.5" fill="#2D3E63" opacity="0.28" />
        <rect x="153" y="46" width="38" height="4" rx="2" fill="#2D3E63" opacity="0.17" />
      </g>
      <rect x="80" y="20" width="100" height="74" rx="10" fill="white" />
      <rect x="80" y="20" width="100" height="74" rx="10" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle cx="102" cy="40" r="12" fill="#E3F5F3" />
      <circle cx="102" cy="40" r="7" stroke="#2F8F9D" strokeWidth="1.5" fill="none" />
      <circle cx="102" cy="40" r="3" fill="#2F8F9D" />
      <rect x="119" y="33" width="48" height="5" rx="2.5" fill="#1F2A37" opacity="0.14" />
      <rect x="119" y="42" width="34" height="3.5" rx="1.75" fill="#667085" opacity="0.2" />
      <rect x="90" y="61" width="40" height="18" rx="9" fill="#E3F5F3" />
      <rect x="93" y="67" width="34" height="5" rx="2.5" fill="#2F8F9D" opacity="0.5" />
      <rect x="135" y="61" width="36" height="18" rx="9" fill="#EEF3F7" />
      <rect x="138" y="67" width="30" height="5" rx="2.5" fill="#667085" opacity="0.3" />
      <circle cx="236" cy="26" r="4" fill="#2F8F9D" opacity="0.38" />
      <circle cx="226" cy="14" r="2.5" fill="#2F8F9D" opacity="0.28" />
      <circle cx="248" cy="14" r="1.5" fill="#2D3E63" opacity="0.22" />
      <circle cx="20" cy="118" r="3.5" fill="#2F8F9D" opacity="0.22" />
      <circle cx="8" cy="108" r="2" fill="#2D3E63" opacity="0.18" />
    </svg>
  )
}

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
        {/* Illustration — taller on desktop */}
        <div className="mb-5 md:mb-6 lg:max-w-sm lg:mx-auto">
          <HeroIllustration />
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D3E63] leading-tight">
            需求感受訓練場
          </h1>
          <p className="text-sm md:text-base font-semibold text-[#2F8F9D] mt-2 md:mt-3">
            看懂產品背後真正打動人的感受
          </p>
          <p className="text-xs md:text-sm text-[#667085] mt-3 leading-relaxed max-w-xs mx-auto">
            像玩遊戲一樣，訓練你的觀察力、判斷力與創新力。
          </p>
        </div>
        <div className="mt-5 md:mt-6 pt-4 border-t border-[#E2E8F0] text-center">
          <p className="text-xs text-[#667085] opacity-60 tracking-wide">
            創新先生 陳建銘｜靈感製造機法則
          </p>
        </div>
      </div>

      {/* Mode Cards — 1 col on mobile/tablet, 2 col on desktop */}
      <div className="max-w-2xl lg:max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">

          {/* Judge Mode */}
          <button
            onClick={onStartJudge}
            className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-5 md:p-6 text-left shadow-sm hover:border-[#2F8F9D] hover:shadow-md active:scale-[0.97] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#E3F5F3] flex items-center justify-center flex-shrink-0 p-2.5">
                <JudgeIcon />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-[#1F2A37] text-base md:text-lg">感受判斷</p>
                  <span className="text-xs bg-[#E3F5F3] text-[#2F8F9D] font-semibold px-2 py-0.5 rounded-full">
                    6 題闖關
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#667085]">看產品，猜核心感受</p>
              </div>
              <span className="text-[#2F8F9D] text-xl flex-shrink-0">›</span>
            </div>
          </button>

          {/* Transform Mode */}
          <button
            onClick={onStartTransform}
            className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-5 md:p-6 text-left shadow-sm hover:border-[#2D3E63]/30 hover:shadow-md active:scale-[0.97] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 p-2.5"
                style={{ background: 'linear-gradient(135deg, #EEF3F7 0%, #E3F5F3 100%)' }}
              >
                <TransformIcon />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-[#1F2A37] text-base md:text-lg">感受改造</p>
                  <span className="text-xs bg-[#EEF3F7] text-[#2D3E63] font-semibold px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                    自由探索
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#667085]">把產品變得更有感</p>
              </div>
              <span className="text-[#667085] text-xl flex-shrink-0">›</span>
            </div>
          </button>

        </div>
      </div>
    </div>
  )
}
