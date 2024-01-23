import CountryName from "./CountryName"
import Country from "./Country"
const Contents = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter </div>
  } else if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />
  } else {
    return (
      <ul>
        {countriesToShow.map((c) => (
          <CountryName country={c} key={c.name.common} />
        ))}
      </ul>
    )
  }
}
export default Contents
