import anecdoteService from '../services/anecdotes'

const compareAnec=(anec1,anec2)=>
  (anec1.votes >anec2.votes)? -1:(
      (anec2.votes>anec1.votes)?1:0)


export const sendVote =(id)=>{
  return async (dispatch) =>{
    const anecdotes = await anecdoteService.getAll()
    const anecdoteTovote = anecdotes.find(n=>n.id===id)
    const changedAnecdote = {
      ...anecdoteTovote, votes:anecdoteTovote.votes+1
    }
    await anecdoteService.update(id, changedAnecdote)
    dispatch({
      type: 'INCREASE_VOTE',
      data: changedAnecdote
    })

  }
}

export const initAnecdotes =()=>{
  return async  (dispatch)=>{
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const newAnecdote = (anecdote)=>{
  return async  (dispatch)=>{
    const resp = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: resp
    })
  }
}

// const initialState = anecdotesAtStart.map(asObject).sort((anec1,anec2)=>(anec1.votes >anec2.votes)? -1:((anec2.votes>anec1.votes)?1:0))

const anecreducer = (state = [], action) => {

  switch (action.type) {
    case 'INCREASE_VOTE':{
      const id = action.data.id
      const newState= state.map(blog=>blog.id===id?action.data:blog)
      const newSortedState=newState.sort(compareAnec)
      return newSortedState
    }
    case 'NEW_ANECDOTE':{
      const newState=[...state,action.data]
      const newSortedState=newState.sort(compareAnec)
      return newSortedState
    }case 'INIT':{
      return action.data
    }
    default:
      return state
  }

}

export default anecreducer