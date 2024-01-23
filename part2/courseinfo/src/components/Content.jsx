import Part from "./Part"
const Content = ({ parts }) => {
  const initialvalue = 0
  console.log(parts)
  const sum = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialvalue
  )

  return (
    <div>
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
      <strong>total of {sum} exercises</strong>
    </div>
  )
}
export default Content
