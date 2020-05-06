import React, { useState, useEffect } from 'react';
import './index.css'
import './media.css'

let selected;
let random = null;

function App() {

  const [list, setList] = useState(
    JSON.parse(localStorage.getItem('movies')) || [])
  const [text, setText] = useState("")



  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(list));
  }, [list])

  const removeSelected = () => { //removes yellow selected
    if (selected !== undefined) {
      selected.classList.remove("selected")
      selected.classList.remove("finalSelect")
    }
  }


  const handleRandom = () => {
    random = null
    if (list.length <= 1) {
      alert("Enter more than one option!")
      return
    }
    let i = 0
    const time = setInterval(() => { //runs through 10 iterations of random choice without repeating the last selection
      i++
      let randomNum = Math.floor(Math.random() * list.length)

      if (randomNum === random) {
        while (randomNum === random) {
          randomNum = Math.floor(Math.random() * list.length)
        }
      }
      random = randomNum

      removeSelected()
      selected = document.getElementById(randomNum)
      selected.classList.add("selected")
      if (i > 10) {
        clearInterval(time)
        selected.classList.add("finalSelect")
      }
    }, 150)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    removeSelected()
    if (text !== "") {
      setList([...list, text])
      setText("")
    }
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
    removeSelected()
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
        placeholder="Enter an Option"
        className="movie-input"
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <input
          type="submit"
          className="submit-btn"
          onClick={handleSubmit}
          value="Add +"
          id="add-btn"
      />
      <div className="list-container">
          {items}
      </div>
      <div className="btn-container">
        <button
          onClick={handleRandom}
          id="random-btn"
        >
          Select Random
        </button>
        <button
            id="clear-all-btn"
            onClick={handleClearAll}
            >Clear All</button>
      </div>
    </div>
  )

}

export default App
