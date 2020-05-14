import React from "react";
import { useDispatch,connect } from 'react-redux'
import {newAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";


const AnecdoteForm=(props)=>{
    // const dispatch=useDispatch()

    const addAnec = async(event)=>{
        event.preventDefault()
        const anec=event.target.anecdote.value
        event.target.anecdote.value = ""
        props.newAnecdote(anec)
        props.setNotification(`You have created a new anecdote '${anec}'`,5)

    }

    return(
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnec}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>

    </form>

        </div>)

}

const mapDispatchToProps ={
    newAnecdote,
    setNotification
}
export default  connect(null,mapDispatchToProps)(AnecdoteForm)