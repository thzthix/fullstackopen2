const SearchForm = ({ value, handleChange }) => {
  return (
    <div>
      <label>find countries</label>
      <input type="text" value={value} onChange={handleChange}></input>
    </div>
  )
}
export default SearchForm
