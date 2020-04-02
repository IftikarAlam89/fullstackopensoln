
import React, {useState} from "react";

const Weatherdets=(props)=>{
    return (<div>
        <h2>Weather in {props.country.capital}</h2>
        <div><b>temperature:</b>{props.apires.current.temperature} Celcius<br/>
        <img src={props.apires.current.weather_icons[0]} width="80" height="80" alt={"map"}/><br/>
        <b>wind:</b>{props.apires.current.wind_speed} mph direction {props.apires.current.wind_direction}</div>
    </div>)
}

export default Weatherdets