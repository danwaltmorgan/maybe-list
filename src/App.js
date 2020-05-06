import React, { useState } from 'react';
import './index.css'

let selected;

function App() {

  const [list, setList] = useState([])
  const [text, setText] = useState("")
  // const [selected, setSelected] = useState(undefined)


  const removeSelected = () => {
    if (selected !== undefined) {
      selected.classList.remove("selected")
    }
  }

  const handleRandom = () => {
    if (list.length === 0) return
    let randomNum = Math.floor(Math.random() * list.length)
    removeSelected()
    selected = document.getElementById(randomNum)
    console.log(selected)
    selected.classList.add("selected")
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (event) => {
    // event.preventDefault()
    console.log(selected)
    removeSelected()
    if (text !== "") {
      setList([...list, text])
      setText("")
    }
    // e.preventDefault()
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  const handleClearAll = () => {
    setList([])
  }

  const deleteItem = (index) => {
    let newList = [...list]
    if (index !== -1) {
      newList.splice(index, 1)
      setList(newList)
    }
  }

  const items = list.map((item, i) => {
    return <div
      key={i}
      id={i}
      className="list-item"
      >{item}
      <div
        className="delete"
        onClick={() => deleteItem(i)}
        >X</div>
    </div>
  })

  return (
    <div className="container">
      <h1>Maybe List</h1>
      <input
        placeholder="Enter a Movie"
        className="movie-input"
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <input
          type="submit"
          className="submit-btn"
          onClick={handleSubmit}
          value="Add"
      />
      <div className="list-container">
          {items}
      </div>
      <button
        onClick={handleRandom}
        >
        Select Random
      </button>
      <button
        id="clear-all-btn"
        onClick={handleClearAll}
        >Clear All</button>
    </div>
  )

}

export default App
