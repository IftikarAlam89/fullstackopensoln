import React from 'react';

const Numbers=({persons,delt})=>{
    return (persons.map((person)=>(<div key={person.id}>{person.name} {person.number}<button onClick={()=>delt(person.id)}>delete</button> </div>)))
}

export default Numbers