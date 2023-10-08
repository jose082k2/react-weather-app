import React from "react";
import "./Current.css";

function Current({current,city}) {
  return( <div className="current">
    <b>{city} </b>
    <br/>
    <b>Current Weather</b>
    <div className="currentbody">
     <img src={current.condition.icon}/>
     <span>{current.condition.text}</span>
     <span>
        <b>Temp</b>
        {current.temp_c}deg
     </span>
     <span>
        <b>Feels like</b>
        {current.feelslike_c}deg
     </span>
     <span>
        <b>Wint speed </b>
        {current.wind_kph}deg
     </span>
    </div>
  </div>);
};

export default Current;
