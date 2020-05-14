import React from "react";
import {useDispatch, useSelector,connect} from 'react-redux'
import {sendVote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteList=(props)=>{
    //const anecdotes = useSelector(state=>state.anec)
    //const filtervalue = useSelector(state=>state.filtered)
    const anecdotes = props.anecdotes
    const filtervalue =props.filter
    const dispatch = useDispatch()
    const vote = (id) => {
        props.sendVote(id)
        const cont = anecdotes.find(n=>n.id===id)
        props.setNotification(`You have voted for '${cont.content}'`,5)
    }
    const SingleAnecdote=(anecdote)=> {
        return (<div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>)
    }
    const newanecdotes=anecdotes.filter(anecdote=>anecdote.content.includes(filtervalue))
    return (newanecdotes.map(anecdote=>SingleAnecdote(anecdote)))

}

const mapStateToProps = (state)=>{
    return {
        anecdotes: state.anec,
        filter: state.filtered
    }
}
const mapDispatchToProps = {
    sendVote,
    setNotification
}
const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes