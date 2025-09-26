import './App.css'
import Game from './Game'
import Leaderboard from './Leaderboard'

function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Clicker Game (React)</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 12 }}>
        <Game />
        <Leaderboard />
      </div>
    </div>
  )
}

export default App
