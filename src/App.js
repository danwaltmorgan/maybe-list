import React, { useState, useEffect } from 'react';
import './index.css'
import './media.css'
import click from './audio/button-50.wav'
import beep from './audio/button-37.wav'

let selected;
let random = null;
let time;

function App() {

  const [list, setList] = useState(
    JSON.parse(localStorage.getItem('Options List')) || [])
  const [text, setText] = useState("")



  useEffect(() => {
    localStorage.setItem('Options List', JSON.stringify(list));
  }, [list])

  const removeSelected = () => { //removes yellow selected
    if (selected !== undefined  ) {
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
    //runs through 10 iterations of random choice without repeating the last selection
    time = setInterval(() => {
      i++
      let randomNum = Math.floor(Math.random() * list.length)

      // makes sure that the last number isn't the same as current
      if (randomNum === random) {
        while (randomNum === random) {
          randomNum = Math.floor(Math.random() * list.length)
        }
      }
      random = randomNum

      removeSelected()
      selected = document.getElementById(randomNum)
      selected.classList.add("selected")
      handleAudio("click")

      if (i > 15) { //number of iterations through the clicking
        clearInterval(time)
        handleAudio('beep')
        selected.classList.add("finalSelect")
      }
    }, 100)
  }

  const handleClearInteraval = (interval) => {
    clearInterval(interval)
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
    if (list.length === 0) {
      alert("Nothing to clear!")
    } else {
      clearInterval(time)
      setList([])
    }
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

  const handleAudio = (id) => {
    let audio = document.getElementById(id)
    audio.play()
    // audio.pause()
    audio.currentTime = 0
    console.log(audio.play())
  }

  return (
    <div className="container">
      <audio id="click" src={click} preload="auto"></audio>
      <audio id="beep" src={beep} preload="auto"></audio>

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
