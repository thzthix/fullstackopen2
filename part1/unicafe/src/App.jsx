import { useState } from "react"
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}
const Buttons = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
    </div>
  )
}
const Statistic = ({ feedback, number }) => {
  if (feedback === "positive") {
    number = number.toString() + "%"
  }
  return (
    <tr>
      <td>{feedback}</td>
      <td>{number}</td>
    </tr>
  )
}
const Statistics = ({ feedbacks, numbers }) => {
  if (numbers[3] < 1) {
    return <div>No feedback given </div>
  }
  return (
    <table>
      <Statistic feedback={feedbacks[0]} number={numbers[0]} />

      <Statistic feedback={feedbacks[1]} number={numbers[1]} />

      <Statistic feedback={feedbacks[2]} number={numbers[2]} />

      <Statistic feedback={feedbacks[3]} number={numbers[3]} />

      <Statistic feedback={feedbacks[4]} number={numbers[4]} />

      <Statistic feedback={feedbacks[5]} number={numbers[5]} />
    </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)
    setPositive((updatedGood / updatedTotal) * 100)
    setAverage((updatedGood * 1 + neutral * 0 - bad) / updatedTotal)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = good + updatedNeutral + bad
    setTotal(good + updatedNeutral + bad)
    setPositive((good / updatedTotal) * 100)
    setAverage((good * 1 + updatedNeutral * 0 - bad) / updatedTotal)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = good + neutral + updatedBad
    setTotal(updatedTotal)
    setPositive((good / updatedTotal) * 100)
    setAverage((good * 1 + neutral * 0 - updatedBad) / updatedTotal)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Buttons
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
      <h2>statistics</h2>
      <Statistics
        feedbacks={["good", "neutral", "bad", "all", "average", "positive"]}
        numbers={[good, neutral, bad, total, average, positive]}
      />
    </div>
  )
}

export default App
