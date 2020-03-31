import React from 'react';

const Searchbar=(props)=>{
    return(<div>filter shown with <input onChange={props.search} value={props.searchItem}/></div>)
}

export default Searchbar