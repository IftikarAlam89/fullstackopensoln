import React from "react";

const Course=({course})=>{return (<div key={course.id}>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>

</div>)};

const Part=(props)=>{return (<p key={props.part}>
    {props.part} {props.exercises}
</p>)}

const Header=(props)=>{return(<h2>
    {props.course} </h2>)}

const Content=(props)=>{return(<div>
    {props.parts.map((part) =>
        <Part key={part.id} part={part.name}
              exercises={part.exercises} />)}
</div>)}

const Total=(props)=>{return (<p><b>
    total of {props.parts.reduce((total,part)=>total+part.exercises,0)} exercises
</b></p>)}

export default Course