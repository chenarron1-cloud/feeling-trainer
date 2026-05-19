export default function ResultScreen({ result, onReplay, onTransform, onHome }) {
  const { correctCount, total } = result
  const rate = Math.round((correctCount / total) * 100)

  const getMessage = () => {
    if (rate === 100) return { emoji: '🏆', label: '滿分通關', text: '你有洞察產品靈魂的眼睛。' }
    if (rate >= 67)  return { emoji: '🎯', label: '優秀觀察者', text: '你的感受觀察力正在成長中。' }
    if (rate >= 33)  return { emoji: '💡', label: '繼續練習', text: '感受力需要反覆訓練，再挑戰一次。' }
    return             { emoji: '🌱', label: '剛開始萌芽', text: '感受力需要培養，繼續加油！' }
  }

  const { emoji, label, text } = getMessage()

  return (
    <div className="max-w-xl lg:max-w-2xl mx-auto pt-6 md:pt-10 pb-6">

      {/* Result Hero */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 mb-5 text-center">
        <div className="text-6xl mb-4 animate-pop">{emoji}</div>
        <span className="inline-block text-xs font-bold text-[#2F8F9D] bg-[#E3F5F3] px-3 py-1 rounded-full mb-3">
          {label}
        </span>
        <h2 className="text-2xl font-bold text-[#2D3E63]">完成訓練！</h2>
        <p className="text-xs text-[#667085] mt-2 leading-relaxed">
          你已經開始從功能，看見產品背後的感受。
        </p>

        {/* Score */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
          <div className="flex items-end justify-center gap-1 mb-3">
            <span className="text-5xl font-bold text-[#1F2A37]">{correctCount}</span>
            <span className="text-xl text-[#667085] mb-1.5">/ {total}</span>
          </div>

          {/* Progress bar */}
          <div className="h-2.5 bg-[#EEF3F7] rounded-full overflow-hidden mb-2">
            <div
              className="h-2.5 rounded-full transition-all duration-700"
              style={{
                width: `${rate}%`,
                background: 'linear-gradient(90deg, #2F8F9D 0%, #1F6F78 100%)',
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#667085]">
            <span>正確率</span>
            <span className="font-bold text-[#2F8F9D]">{rate}%</span>
          </div>

          <p className="text-xs text-[#667085] mt-4 leading-relaxed">{text}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <button
          onClick={onReplay}
          className="w-full py-4 text-white font-bold rounded-2xl active:scale-95 transition-all duration-150 text-base"
          style={{
            backgroundColor: '#2F8F9D',
            boxShadow: '0 4px 16px rgba(47,143,157,0.28)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1F6F78')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2F8F9D')}
        >
          再玩一次
        </button>
        <button
          onClick={onTransform}
          className="w-full py-4 bg-white border border-[#E2E8F0] text-[#2D3E63] font-bold rounded-2xl hover:bg-[#F6F9FB] active:scale-95 transition-all duration-150 text-base shadow-sm"
        >
          進入感受改造 ✦
        </button>
        <button
          onClick={onHome}
          className="w-full py-3 text-[#667085] font-medium text-sm hover:text-[#1F2A37] transition-colors"
        >
          回首頁
        </button>
      </div>
    </div>
  )
}
