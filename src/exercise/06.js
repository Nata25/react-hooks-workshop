// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemonState, setPokemonState] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState(null)
  
  React.useEffect(() => {
    if (!pokemonName) {
      setStatus('idle')
      return
    }
    setStatus('pending')
    setPokemonState(null)
    fetchPokemon(pokemonName).then(
      (pokemonData) => {
        if (pokemonData) {
          setPokemonState(pokemonData)
          setStatus('resolved')
        }
      },
      e => {
        setError(e)
        setStatus('rejected')
      }
    )
  }, [pokemonName])

  const statusesMap = {
    'idle': () => 'Submit a pokemon',
    'pending': () => <PokemonInfoFallback name={pokemonName} />,
    'rejected': () => (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    ),
    'resolved': () => <PokemonDataView pokemon={pokemonState} />
  }

  return statusesMap[status]()
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
