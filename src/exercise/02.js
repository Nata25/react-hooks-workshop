// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  let [name, setName] = useLocalStorageState('name')
  let [test, setTest] = React.useState(0)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // custom hook
  function useLocalStorageState (key) {
    const [state, setState] = React.useState(() => {
      return JSON.parse(window.localStorage.getItem(key)) || initialName
    })

    function updateLS () {
      window.localStorage.setItem('name', JSON.stringify(name))
    }

    React.useEffect(() => {
      updateLS()
    }, [state])

    return [state, setState]
  }
  
  function handleChange(event) {
    setName(event.target.value)
  }

  function handleClick () {
    setTest(test + 1)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
      <button onClick={handleClick}>click me</button>
      <p>{test}</p>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
