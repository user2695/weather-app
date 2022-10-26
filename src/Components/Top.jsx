import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Top() {
  const [city, setCity] = useState("");
  const [name, setName] = useState("Srinagar");
  const [temp, setTemp] = useState("24");
  const [feelsLike, setFeelsLike] = useState("");
  const [icon, setIcon] = useState("");

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
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_KEY}`
      )
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setTemp(Math.trunc(response.data.main.temp - 274));
        setFeelsLike(Math.trunc(response.data.main.feels_like) - 274);
        setIcon(response.data.weather[0].icon);
      });
  }, [name]);
  return (
    <>
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
      <div className="circle-left"></div>
      <div className="circle-right"></div>
      <div className="main-bottom">
        <form className="search" onSubmit={handleSubmit}>
          <input className="input" onChange={handleChange}></input>
          <button>Search</button>
        </form>
      </div>
    </>
  );
}
export default Top;
