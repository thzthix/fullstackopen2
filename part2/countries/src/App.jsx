import { useState, useEffect } from "react"
import axios from "axios"
import SearchForm from "./components/searchForm"
import Contents from "./components/Contents"

const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [countriesToShow, setContriesToShow] = useState([])
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
    setContriesToShow(
      allCountries.filter((c) =>
        c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const returnedCountries = response.data
        setAllCountries(returnedCountries)
        setContriesToShow(returnedCountries)
      })
  }, [])

  return (
    <>
      {allCountries.length === 0 ? (
        <p>loading...</p>
      ) : (
        <div>
          <SearchForm value={searchQuery} handleChange={handleInputChange} />
          <Contents countriesToShow={countriesToShow} />
        </div>
      )}
    </>
  )
}
export default App
