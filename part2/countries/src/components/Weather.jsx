import { useEffect, useState } from "react"
import axios from "axios"
const api_key = import.meta.env.VITE_API_KEY
const Weather = ({ latlng }) => {
  const [weatherInfo, setWeatherInfo] = useState(null)
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`
  useEffect(() => {
    axios.get(URL).then((response) => {
      const weatherData = response.data
      setWeatherInfo(weatherData)
    })
  }, [])

  return (
    <div>
      {weatherInfo && (
        <>
          <h2>Wheather in {weatherInfo.name}</h2>
          <p>temperature: {weatherInfo.main.temp}&#8451;</p>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
              alt={`Flag of ${weatherInfo.name}`}
            />
            <div>
              <span>{weatherInfo.weather[0].main}</span>
              <span> wind {weatherInfo.wind.speed}m/s</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default Weather
