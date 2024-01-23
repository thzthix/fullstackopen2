const PersonForm = ({
  onSubmit,
  handlePersonChange,
  newName,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={handlePersonChange} value={newName} required />
      </div>
      <div>
        number:{" "}
        <input onChange={handleNumberChange} value={newNumber} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm
