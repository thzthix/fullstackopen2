import Weather from "./Weather"
const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p>languages:</p>
      <ul>
        {Object.keys(country.languages).map((k) => (
          <li key={k}>{country.languages[k]}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png} />
      </div>
      <Weather latlng={country.capitalInfo.latlng} />
    </div>
  )
}
export default Country
