import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0))
    const votesCopy=[...votes]
    const updateVotes=()=>{
        votesCopy[selected]+=1
        setVotes(votesCopy)
    }
    const maxVotes=votes.indexOf( Math.max(...votes));
    return (
        <div>
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}<br />
            has {votes[selected]} votes <br/>
            <Button genAnec={updateVotes} text="vote"/>
            <Button genAnec={()=>setSelected(rand_ind()-1)} text="next anecdote"/>

        </div>
            <div>
                <h2>Anecdote with most votes</h2>
                {props.anecdotes[maxVotes]}<br />
                has {votes[maxVotes]} votes <br/>

            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const rand_ind=()=>Math.round(Math.random()*anecdotes.length)

const Button=(props)=>{
    return(<button  onClick={props.genAnec}>{props.text}</button>)
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)