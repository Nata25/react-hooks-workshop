// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils'

function Board({ squares, onClick }) {
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

function Game() {
  // const [history, setHistory] = React.useState([Array(9).fill(null)])
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [Array(9).fill(null)])
  // const [currentStep, setCurrentStep] = React.useState(0)
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:step', 0)
  
  let historyCopy = [...history]
  let currentState = historyCopy[currentStep]

  let nextValue = calculateNextValue(currentState)
  let winner = calculateWinner(currentState)
  let status = calculateStatus(winner, currentState, nextValue)

  function selectSquare(square) {
    if (winner || currentState[square]) return
    const newState = [...currentState]
    newState[square] = nextValue
    if (currentStep + 1 <= history.length - 1) {
      historyCopy = historyCopy.slice(0, currentStep + 1)
    }
    historyCopy.push([...newState])
    setCurrentStep(currentStep + 1)
    setHistory(historyCopy)
  }

  const moves = history.map((step, ind) => 
    <li key={ind}>
      <button
        disabled={currentStep === ind}
        onClick={() => changeHistory(ind)}
      >
        {ind ? `Go to move #${ind}` : 'Go to game start'}
        {`${currentStep === ind ? ' (current)' : ''}`}
      </button>
    </li>
  )

  function changeHistory (step) {
    setCurrentStep(step)
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
          <ol>{moves}</ol>
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
