import React from "react";

const Details=({country})=>{
    return(<div><h1>{country.name}</h1>
                        capital {country.capital}<br/>
                        population {country.population}
                        <h2>Spoken languages</h2>
                        <ul>{country.languages.map(language=><li key={language.name}>{language.name}</li>)}
                        </ul>
                        <img src={country.flag}  width="193" height="130" alt={"map"}/>
    </div>)
}

export default Details;
