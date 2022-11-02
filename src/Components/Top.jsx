import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Days from "./Days";
function Top() {
  const [city, setCity] = useState("");
  const [name, setName] = useState("Srinagar");
  const [temp, setTemp] = useState("24");
  const [feelsLike, setFeelsLike] = useState("");
  const [icon, setIcon] = useState("");
  const [array, setArray] = useState([]);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = days[d.getDay()];
  let date = d.getDate();
  function handleSubmit(e) {
    e.preventDefault();
    setName(city);
    e.target.reset();
  }

  function handleChange(e) {
    setCity(e.target.value);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_KEY}`
        );
        setName(fetchWeather.data.name);
        setTemp(Math.trunc(fetchWeather.data.main.temp - 274));
        setFeelsLike(Math.trunc(fetchWeather.data.main.feels_like) - 274);
        setIcon(fetchWeather.data.weather[0].icon);

        const fetchForecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${process.env.REACT_APP_KEY}`
        );
        // console.log("fetch data is: ", fetchForecast.data);
        let fetchArray = fetchForecast.data.list;
        const array = [];
        for (let i = 0; i < fetchArray.length; i += 6) {
          array.push(fetchArray[i]);
        }
        setArray(array);
        // console.log(array);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [name]);

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="input"
          onChange={handleChange}
          placeholder="type city name"
        ></input>
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>
      <div className="main-div">
        <div className="main__left">
          <h1>
            {day} {date}
          </h1>
          <p>Today in {name}</p>
        </div>
        <div className="icons">
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        </div>

        <div className="main__right">
          <h1 className="degree">
            {temp}
            <sup>o</sup>
          </h1>
          <p>
            Feels like {feelsLike}
            <sup>o</sup>C
          </p>
        </div>
      </div>
      <div className="forecast-heading">
        <h1>7 day Forecast</h1>
      </div>
      <div className="forecast">
        {array.map((data) => (
          <Days data={data} />
        ))}
      </div>
    </>
  );
}
export default Top;
