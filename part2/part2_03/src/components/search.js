import React from "react";

const Searchbar=(props)=>{
    return(<div>
        find countries
        <input onChange={props.searchmethod}
               value={props.searchItem}/></div>)
}

export default Searchbar