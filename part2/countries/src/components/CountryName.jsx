import { useState } from "react"
import Country from "./Country"

// variable api_key now has the value set in startup

const CountryName = ({ country }) => {
  const [isShown, setIsShown] = useState(false)
  const toggleIsShown = () => {
    setIsShown((prevIsShown) => !prevIsShown)
  }

  return (
    <li>
      {!isShown && country.name.common}
      {isShown && <Country country={country} />}
      <button onClick={toggleIsShown}>{isShown ? "hide" : "show"}</button>
    </li>
  )
}
export default CountryName
