import React from 'react';

const Adddetail=(props)=>{
    return(<form onSubmit={props.submit}>
        <div>
            name: <input onChange={props.inchange} value={props.name}/></div>
        <div>
            number: <input onChange={props.nchange} value={props.number}/>
        </div>
        <div>
            <button type="submit" >add</button>
        </div>
    </form>)
}

export default Adddetail