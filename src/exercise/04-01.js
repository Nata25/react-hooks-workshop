// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
// import { useLocalStorageState } from '../utils'

function Board({ squares, onClick }) {
  React.useEffect(() => {
    // window.localStorage.setItem('squares', JSON.stringify(squares))
  })

  function renderSquare(i) {
    return (
      <button className="square" onClick={(e) => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function History ({currentStep}) {
  return (
    <p>{currentStep}</p>
  )
}

function Game() {
  // const [history, setHistory] = useLocalStorageState('history', [Array(9).fill(null)])
  const [history, setHistory] = React.useState([Array(9).fill(null)])
  const [currentStep, setCurrentStep] = React.useState(0)
  
  const historyCopy = [...history]
  console.log('currentStep', currentStep)
  let currentState = historyCopy[currentStep]
  console.log('current state', currentState)

  let nextValue = calculateNextValue(currentState)
  let winner = calculateWinner(currentState)
  let status = calculateStatus(winner, currentState, nextValue)

  function selectSquare(square) {
    console.log('selectSquare', square)
    if (winner || currentState[square]) return
    currentState[square] = nextValue
    console.log('change!')
    console.log('currentState', currentState)
    historyCopy[currentStep + 1] = currentState
    console.log('history', historyCopy)
    setCurrentStep(currentStep + 1)
    setHistory(historyCopy)
  }

  function restart() {
    setCurrentStep(0)
    setHistory([Array(9).fill(null)])
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentState} onClick={selectSquare}/>
        <button className="restart" onClick={restart}>
          restart
        </button>
        <div className="game-info">
          <p>{status}</p>
          <History history={history} currentStep={currentStep} />
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
