import React, {useState}from 'react';
import {useEffect} from "react";
import axios from 'axios';
import Disp from "./components/disp";




const App=()=> {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [results, setResults] = useState([])
  const [apires,setApires]=useState([])


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  useEffect(() => {
    if (results[0]===undefined || results[0].capital===""){
      return
    }else {
      const url='http://api.weatherstack.com/current'
      const params={
        access_key: 'c7c1ba1ee7a7468e4f0d76021b038140',
        query: results[0].capital

      }
      axios.get(url,{params}).then((response)=>{
        setApires(response.data)})
    }

  }, [results])




  const onChanged = (event) => {
    setCountry(event.target.value)
    const newCountries = [...countries]
    setResults(newCountries.filter(indcountry => indcountry.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  return (<Disp searchmethod={onChanged} searchitem={country} results={results} countrylist={results} handleShow={setResults} apires={apires}/>)
}




export default App;
