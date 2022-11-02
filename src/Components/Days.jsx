import React from "react";
import "../App.css";
function Days(props) {
  console.log(props);
  return (
    <>
      <div className="forecast-list">
        <p>{props.data.dt_txt.substring(0, props.data.dt_txt.indexOf(" "))}</p>
        <h3>
          {Math.trunc(props.data.main.temp_max - 274)}
          <sup>o</sup>C
        </h3>
        <img
          src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
          alt=""
          className="week-icons"
        />
      </div>
    </>
  );
}

export default Days;
