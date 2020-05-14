import React from 'react'
import {useDispatch,connect} from 'react-redux'
import {filtered} from "../reducers/filterreducer";

const Filter = (props) => {
    // const dispatch = useDispatch()
    const handleChange = (event) => {
        event.preventDefault()
        const search = event.target.value
        props.filtered(search)
    }
    const style = {
        marginBottom: 10
    }

    return (
        < div style={style}>
        <br/>
            filter <input onChange={handleChange} />
        </div>
    )
}
const mapDispatchToProps ={
    filtered
}

export default connect(null, mapDispatchToProps)(Filter)