import { useEffect, useState, useRef } from 'react'

async function api(path, opts = {}) {
  // ensure cookies (session) are sent
  if (!opts.credentials) opts.credentials = 'include'
  const res = await fetch(path, opts)
  if (!res.ok) {
    const text = await res.text()
    try {
      return { ok: false, body: JSON.parse(text) }
    } catch (e) {
      return { ok: false, body: { error: text || res.statusText } }
    }
  }
  const body = await res.json().catch(() => null)
  return { ok: true, body }
}

function escapeHtml(s) {
  if (!s) return ''
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

export default function Game() {
  const [currentUsername, setCurrentUsername] = useState(null)
  const [clicks, setClicks] = useState(0)
  const [timer, setTimer] = useState(10)
  const [gameActive, setGameActive] = useState(false)
  const [message, setMessage] = useState('')
  const [labelInput, setLabelInput] = useState('')
  const timerRef = useRef(null)
  const endingRef = useRef(false)
  const clicksRef = useRef(0)

  useEffect(() => {
    // check auth on mount
    (async () => {
      const res = await api('/api/me')
      if (res.ok && res.body && res.body.loggedIn) {
        setCurrentUsername(res.body.username)
      } else {
        setCurrentUsername(null)
      }
    })()

    return () => clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (!gameActive) return
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          // will reach 0, end game
          clearInterval(timerRef.current)
          endGame()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameActive])

  const startGame = (e) => {
    e?.preventDefault()
    setClicks(0)
    clicksRef.current = 0
    setTimer(10)
    endingRef.current = false
    setGameActive(true)
    setMessage('')
  }

  const registerClick = () => {
    if (!gameActive) return
    setClicks((c) => {
      const next = c + 1
      try { clicksRef.current = next } catch (e) {}
      return next
    })
  }

  const endGame = async () => {
    // guard against multiple calls
    if (endingRef.current) return
    endingRef.current = true
    clearInterval(timerRef.current)
    setGameActive(false)
  const totalTime = 10
  const finalClicks = (typeof clicksRef.current === 'number' && clicksRef.current >= 0) ? clicksRef.current : clicks
  const cps = (finalClicks / totalTime) || 0
  const label = labelInput.trim() || (currentUsername ? `${currentUsername} run` : 'Anonymous run')
    // always save a local temporary copy so leaderboard shows the score immediately
    const localKey = 'localScores'
    const tmpId = `local-${Date.now()}-${Math.floor(Math.random()*10000)}`
  const item = { name: label, score: Number(finalClicks) || 0, clicksPerSecond: Number(cps.toFixed(2)) || 0, createdAt: new Date().toISOString(), _id: tmpId }
    try {
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]')
      existing.push(item)
      localStorage.setItem(localKey, JSON.stringify(existing))
      try { window.dispatchEvent(new CustomEvent('scoreSaved')) } catch (e) {}
    } catch (e) {
      // ignore local save errors
    }

    if (currentUsername) {
  setMessage(`Run complete — score ${finalClicks} (${cps.toFixed(2)} clicks/sec). Saving...`)

        const res = await api('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: label, score: finalClicks, clicksPerSecond: Number(cps.toFixed(2)) })
      })

      if (res.ok) {
        setMessage('Saved!')
        // remove the temporary local copy now that server save succeeded
        try {
          const existing2 = JSON.parse(localStorage.getItem(localKey) || '[]')
          const filtered = existing2.filter(s => s._id !== tmpId)
          localStorage.setItem(localKey, JSON.stringify(filtered))
        } catch (e) {}
        try { window.dispatchEvent(new CustomEvent('scoreSaved')) } catch (e) {}
      } else {
        setMessage('Could not save to server: ' + (res.body?.error || JSON.stringify(res.body)))
        // keep local copy so score still appears
      }
    } else {
  setMessage(`Run complete — score ${finalClicks} (${cps.toFixed(2)} clicks/sec). Saved locally.`)
    }
  }

  return (
    <div className="game-root">
      <form id="nameForm" onSubmit={startGame} className={gameActive ? 'hidden' : ''}>
        <label htmlFor="yourname">Label (optional)</label>
        <input id="yourname" value={labelInput} onChange={(e) => setLabelInput(e.target.value)} />
        <button type="submit">Start</button>
      </form>

      <div id="gameArea" aria-hidden={!gameActive} className={gameActive ? '' : 'hidden'}>
        <div id="clickCountDisplay">Clicks: {clicks}</div>
        <div id="timer">Time left: {timer}</div>
        <button id="clickButton" onClick={registerClick} disabled={!gameActive} aria-disabled={!gameActive}>
          Click me
        </button>
      </div>

      <div id="gameMessage">{message}</div>

      <div style={{ marginTop: 12 }}>
        <div>Signed in as: <strong>{escapeHtml(currentUsername)}</strong></div>
      </div>
    </div>
  )
}
