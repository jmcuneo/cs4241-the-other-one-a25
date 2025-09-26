import { useEffect, useState } from 'react';

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

export default function Leaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  

  useEffect(() => { load() }, [])
  useEffect(() => {
    const onSaved = () => load()
    window.addEventListener('scoreSaved', onSaved)
    return () => window.removeEventListener('scoreSaved', onSaved)
  }, [])

  async function load() {
    setLoading(true)
    setError(null)

    const list = []
    // load server scores (if available)
    const res = await api('/api/results')
    if (res.ok) {
      const serverList = res.body || []
      serverList.forEach(s => list.push(s))
    }

    // load local scores saved while unauthenticated
    try {
      const localKey = 'localScores'
      const local = JSON.parse(localStorage.getItem(localKey) || '[]')
      if (Array.isArray(local)) {
        local.forEach(s => list.push(s))
      }
    } catch (e) {
      setLocalDebug({ error: 'parse error' })
    }

    // deduplicate by _id (server ids and local-... ids)
    const byId = new Map()
    list.forEach(item => {
      const id = item._id || `${item.name}-${item.createdAt}`
      // normalize numeric fields
      const normalized = Object.assign({}, item, { score: Number(item.score) || 0, clicksPerSecond: Number(item.clicksPerSecond) || 0 })
      byId.set(id, normalized)
    })
    const finalList = Array.from(byId.values()).sort((a, b) => b.score - a.score)
    setScores(finalList)
    setLoading(false)
  }

  const onSave = async (id, updates) => {
    const res = await api(`/api/score/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    if (res.ok) {
      await load()
    } else {
      alert('Update failed: ' + (res.body?.error || JSON.stringify(res.body)))
    }
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this run?')) return
    const res = await api(`/api/score/${id}`, { method: 'DELETE' })
    if (res.ok) {
      await load()
    } else {
      alert('Delete failed: ' + (res.body?.error || JSON.stringify(res.body)))
    }
  }

  if (loading) return <div>Loading leaderboard...</div>
  if (error) return <div>Error loading leaderboard: {error}</div>

  return (
    <div>
      <h2>Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Score</th>
            <th style={{ textAlign: 'left' }}>CPS</th>
            <th style={{ textAlign: 'left' }}>When</th>
            <th style={{ textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(row => (
            <Row key={row._id} row={row} onSave={onSave} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

function Row({ row, onSave, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(row.name)
  const [score, setScore] = useState(row.score)
  const [cps, setCps] = useState(Number(row.clicksPerSecond).toFixed(2))

  return (
    <tr style={{ borderTop: '1px solid #ccc' }}>
      <td>
        {!editing ? <span>{escapeHtml(row.name)}</span>
          : <input value={name} onChange={e=>setName(e.target.value)} />}
      </td>
      <td>
        {!editing ? <span>{typeof row.score === 'number' ? row.score : (row.score ?? '—')}</span>
          : <input type="number" value={score} onChange={e=>setScore(Number(e.target.value))} />}
      </td>
      <td>
        {!editing ? <span>{typeof row.clicksPerSecond === 'number' ? Number(row.clicksPerSecond).toFixed(2) : (row.clicksPerSecond ?? '—')}</span>
          : <input type="number" step="0.01" value={cps} onChange={e=>setCps(e.target.value)} />}
      </td>
      <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
      <td>
        {!editing ? (
          <>
            <button onClick={()=>setEditing(true)}>Edit</button>
            <button onClick={()=>onDelete(row._id)} style={{ marginLeft: 8 }}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={async()=>{ await onSave(row._id, { name: name.trim() || row.name, score: Number(score) || row.score, clicksPerSecond: Number(cps) || row.clicksPerSecond }); setEditing(false) }}>Save</button>
            <button onClick={()=>{ setEditing(false); setName(row.name); setScore(row.score); setCps(Number(row.clicksPerSecond).toFixed(2)) }} style={{ marginLeft: 8 }}>Cancel</button>
          </>
        )}
      </td>
    </tr>
  )
}
