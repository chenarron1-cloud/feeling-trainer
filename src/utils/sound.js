// Web Audio API sound effects — no external files, no copyright issues.
// All sounds are generated programmatically and are intentionally quiet.

let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  // Mobile browsers suspend the context until user interaction
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

export function isSoundEnabled() {
  return localStorage.getItem('soundEnabled') !== 'false'
}

export function toggleSound() {
  const next = !isSoundEnabled()
  localStorage.setItem('soundEnabled', next ? 'true' : 'false')
  return next
}

// Generic tone helper: sine oscillator with attack + exponential decay
function tone(ctx, freq, startTime, duration, vol = 0.12) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, startTime)
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(vol, startTime + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.01)
}

// 1. Correct — two ascending tones: C5 → G5 (清脆、有成就感)
export function playCorrect() {
  if (!isSoundEnabled()) return
  const ctx = getCtx()
  const t = ctx.currentTime
  tone(ctx, 523, t, 0.14, 0.12)        // C5
  tone(ctx, 784, t + 0.16, 0.22, 0.14) // G5
}

// 2. Wrong — 答錯音效檔
let btnWrongAudio = null
export function playWrong() {
  if (!isSoundEnabled()) return
  if (!btnWrongAudio) {
    btnWrongAudio = new Audio('/btn-wrong.mp4')
    btnWrongAudio.volume = 0.8
  }
  btnWrongAudio.currentTime = 0
  btnWrongAudio.play().catch(() => {})
}

// 3. Complete — three ascending tones: C5 → E5 → G5 (小慶祝感)
export function playComplete() {
  if (!isSoundEnabled()) return
  const ctx = getCtx()
  const t = ctx.currentTime
  tone(ctx, 523, t, 0.13, 0.10)         // C5
  tone(ctx, 659, t + 0.14, 0.13, 0.12)  // E5
  tone(ctx, 784, t + 0.28, 0.30, 0.14)  // G5
}

// 4. Tap — very subtle click for option selection (非常小聲)
export function playTap() {
  if (!isSoundEnabled()) return
  const ctx = getCtx()
  const t = ctx.currentTime
  tone(ctx, 880, t, 0.04, 0.032)
}

// 5. Start — 按下「開始 Go」時播放的音效檔
let btnStartAudio = null
export function playStart() {
  if (!isSoundEnabled()) return
  if (!btnStartAudio) {
    btnStartAudio = new Audio('/btn-start.mp4')
    btnStartAudio.volume = 0.8
  }
  btnStartAudio.currentTime = 0
  btnStartAudio.play().catch(() => {})
}

// 6. Answer — 選擇答題選項時播放的音效檔
let btnAnswerAudio = null
export function playAnswer() {
  if (!isSoundEnabled()) return
  if (!btnAnswerAudio) {
    btnAnswerAudio = new Audio('/btn-answer.mp4')
    btnAnswerAudio.volume = 0.8
  }
  btnAnswerAudio.currentTime = 0
  btnAnswerAudio.play().catch(() => {})
}

// 7. Transform — 感受改造選擇 ABC 時播放的音效檔
let btnTransformAudio = null
export function playTransform() {
  if (!isSoundEnabled()) return
  if (!btnTransformAudio) {
    btnTransformAudio = new Audio('/btn-transform.mp4')
    btnTransformAudio.volume = 0.8
  }
  btnTransformAudio.currentTime = 0
  btnTransformAudio.play().catch(() => {})
}
