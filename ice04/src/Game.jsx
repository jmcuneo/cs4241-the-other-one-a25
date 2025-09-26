import { useEffect, useState, useRef } from 'react'

async function api(path, opts = {}) {
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
    setTimer(10)
    setGameActive(true)
    setMessage('')
  }

  const registerClick = () => {
    if (!gameActive) return
    setClicks((c) => c + 1)
  }

  const endGame = async () => {
    clearInterval(timerRef.current)
    setGameActive(false)
    const totalTime = 10
    const cps = (clicks / totalTime) || 0
    const label = labelInput.trim() || (currentUsername ? `${currentUsername} run` : 'Anonymous run')

    if (currentUsername) {
      setMessage(`Run complete — score ${clicks} (${cps.toFixed(2)} clicks/sec). Saving...`)

      const res = await api('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: label, score: clicks, clicksPerSecond: Number(cps.toFixed(2)) })
      })

      if (res.ok) {
        setMessage('Saved!')
        // optionally reload scores (not implemented in React view)
      } else {
        setMessage('Could not save: ' + (res.body?.error || JSON.stringify(res.body)))
      }
    } else {
      // not signed in: show final score but don't attempt to save
      setMessage(`Run complete — score ${clicks} (${cps.toFixed(2)} clicks/sec). Not saved (sign in to save).`)
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
