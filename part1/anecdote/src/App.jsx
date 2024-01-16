import { useState } from "react"
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [maxVote, setMaxVote] = useState(0)
  const handleClick = () => {
    const randNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randNum)
  }
  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    const maxNum = Math.max(...copy)
    const maxIndex = copy.findIndex((e) => e === maxNum)
    setMaxVote(maxIndex)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={handleVotes} text="vote" />
      <Button onClick={handleClick} text="next anecdote" />
      <h3>Anecdote with most votes</h3>
      <div>{anecdotes[maxVote]}</div>
      <div>has {votes[maxVote]} votes</div>
    </div>
  )
}

export default App
