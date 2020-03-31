import React, { useState } from 'react'
import Numbers from "./components/numbers";
import Searchbar from "./components/search";
import Adddetail from "./components/adddetails";

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue ] = useState('')
  const InpChange=(event)=>{
    setNewName(event.target.value)
  }
  const NumberChange=(event)=>{
    setNewNumber(event.target.value)

  }
  const Search=(event)=>{
    setSearchValue(event.target.value)
    const newPersons=[...persons]
    setPersons(newPersons.filter(person=>person.name.toLowerCase().startsWith(searchValue.toLowerCase())))
  }
  const Submit=(event)=>{
    event.preventDefault()
    if (!persons.some(person=>person.name===newName)){
      setPersons(persons.concat({name:newName,number:newNumber}))
    }else{
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <Searchbar search={Search} searchItem={searchValue}/>
        <h3>add a new</h3>
        <Adddetail name={newName} number={newNumber} inchange={InpChange} nchange={NumberChange} submit={Submit}/>
        <h3>Numbers</h3>
        <Numbers persons={persons}/>
      </div>
  )
}

export default App