import React, {useEffect, useState} from 'react'
import Numbers from "./components/numbers";
import Searchbar from "./components/search";
import Adddetail from "./components/adddetails";
import personService from "./services/persons";
import Notification from "./components/notification";
import axios from "axios";

const App = () => {


    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchValue, setSearchValue ] = useState('')
    const [ errorMessage,seterrorMessage ] = useState(null)
    const [ err,seterr ] = useState(false)

    useEffect(()=>{personService.getAll().then(returnedPersons=>{setPersons(returnedPersons)})},[])
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

    const deletePerson=(id)=>{
        const nPersons=[...persons]
        const delperson=nPersons.find(per=>per.id===id)
        if (window.confirm(`Delete ${delperson.name} ?`)){
            personService.deletePer(id).then(returnedPersons=>{
                console.log(returnedPersons)
                setPersons(nPersons.filter(per=>per.id!==id))})
        }
    }

    const Submit=(event)=>{
        event.preventDefault()
        const nPersons={
            name:newName,number:newNumber
        }
        if (!persons.some(person=>person.name===newName)){
            personService.create(nPersons)
                .then(returnedPerson=>{setPersons(persons.concat(returnedPerson))
                    seterrorMessage(`Added ${newName}`)
                setTimeout(()=>{seterrorMessage(null)},5000)})


    }else{
     if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
         const nPerson=persons.filter(per=>per.name===newName)[0]
         console.log(nPerson)
         console.log(nPerson.id)
         const changedPerson={...nPerson,number:newNumber}
         personService.update(nPerson.id,changedPerson)
             .then(returnedPerson=>{
                 setPersons(persons.map(person=>person.id!==nPerson.id? person:returnedPerson))})
             .catch(error=>{
                 seterrorMessage(`Information of ${nPerson.name} has already been removed from server`)
                 seterr(true)
                 setTimeout(()=>{seterrorMessage(null)
                 seterr(false)},5000)
                 setPersons(persons.filter(per=>per.id!==nPerson.id))
             })
     }
    }
    setNewName('')
    setNewNumber('')
  }

  return (
      <div>
        <h2>Phonebook</h2>
          <Notification message={errorMessage} error={err}/>
        <Searchbar search={Search} searchItem={searchValue}/>
        <h3>add a new</h3>
        <Adddetail name={newName} number={newNumber} inchange={InpChange} nchange={NumberChange} submit={Submit}/>
        <h3>Numbers</h3>
        <Numbers persons={persons} delt={deletePerson}/>
      </div>
  )
}

export default App