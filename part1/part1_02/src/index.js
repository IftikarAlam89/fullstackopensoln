import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const clickAction=(buttonnm)=>{
        const handleClick=()=>{
            if (buttonnm=="good"){
                setGood(good+1)
            } else if (buttonnm=="neutral"){
                setNeutral(neutral+1)
            } else {
                setBad(bad+1)
            }
        }
        return handleClick
    }
    const total=()=>(good+bad+neutral)
    const average=()=>{if (total()>0){
        return(Math.round(((1*good - bad )/(good+bad+neutral))*10))/10
    } else {
        return 0
    }}
    const positive=()=>{if (total()>0){
        return(Math.round(good/total()*1000)/10 + "%")
    } else {
        return 0
    }}

        return (

            <div>
                <h2>
                    give feedback
                </h2>
                <Button handleClick={clickAction("good")} text="good"/>
                <Button handleClick={clickAction("neutral")} text="neutral"/>
                <Button handleClick={clickAction("bad")} text="bad"/>

                <h2>
                    statistics
                </h2>

                <Statistics good={good} bad={bad} neutral={neutral}
                            average={average()} positive={positive()}/>
            </div>
        )

}

const Button=(props)=>{
    return (<button onClick={props.handleClick}>{props.text}</button>)
}

const Statistics=(props)=> {
    if ((props.good + props.bad + props.neutral) > 0) {


        return (<table>
            <tbody>
            <Statistic text="good" value={props.good}/>
            <Statistic text="neutral" value={props.neutral}/>
            <Statistic text="bad" value={props.bad}/>
            <Statistic text="average" value={props.average}/>
            <Statistic text="positive" value={props.positive}/>
            </tbody>
        </table>)
    } else {
        return (<div>No feedback given</div>)
    }
}

const Statistic=(props)=>(<tr> {props.text} {props.value} </tr>)



ReactDOM.render(<App />,
    document.getElementById('root')
)