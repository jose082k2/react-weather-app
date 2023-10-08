import { useEffect, useState } from "react";
import "./App.css";
import Current from "./components/Current";
import Forecast from "./components/Forecast";

const autocompleteUrl =
  "https://api.weatherapi.com/v1/search.json?key=d628402aefec41069d354707232509&q=";
const weatherUrl=(city) =>
  `https://api.weatherapi.com/v1/forecast.json?key=d628402aefec41069d354707232509&q=${city}&days=7&aqi=no&alerts=no`;

function App() {
  const [city, setCity] = useState("");
  const [current, setCurrent] = useState("");
  const [forecast, setForecast] = useState("");
  const [location, setLocation] = useState("");
  const [clicket, setClicket] = useState(false);
  const [citysuggestion, setCitysuggestion] = useState([]);

  const handleclick = async(clickedCity) => {
    console.log("clickedcity---", clickedCity);
    setCity(clickedCity);
    setClicket(true);

    const resp=await fetch(weatherUrl(city));
    const data=await resp.json();
    setCurrent(data.current);
    setForecast(data.forecast)
    setLocation(data.location.name)
  };

  useEffect(() => {
    const getdataaftertimeout = setTimeout(() => {
      const fetchcitysuggestion = async () => {
        const resp = await fetch(autocompleteUrl + city);
        const data = await resp.json();
        const citysuggestionData = data.map(
          (curdata) => `${curdata.name},${curdata.region},${curdata.country}`
        );
        setCitysuggestion(citysuggestionData);
      };
      if (!clicket && city.length > 2) {
        fetchcitysuggestion();
      } else {
        setCitysuggestion([]);
        setClicket(false);
      }
    }, 1000);

    return () => clearTimeout(getdataaftertimeout);
  }, [city]);

  return (
    <div className="App">
      <div className="header">
        <b>JOSE WEATHER REPORT!!!</b>
      </div>
      <div className="App_body">
        <input
          type="text"
          className="citytextbox"
          placeholder="Enter the city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        {citysuggestion.length > 0 && (
          <div className="suggestionwraber">
            {citysuggestion.map((curcity) => (
              <div className="suggestion" onClick={() => handleclick(curcity)}>
                {curcity}
              </div>
            ))}
          </div>
        )}
       {current&&<Current current={current} city={location}/>}
       {forecast&&<Forecast forecast={forecast} city={location} />} 
      </div>
    </div>
  );
}

export default App;
