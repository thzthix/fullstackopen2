import Person from "./Person"
const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={() => {
            handleDelete(person.id)
          }}
        />
      ))}
    </div>
  )
}
export default Persons
