import React from "react";

const AllshowDisp=(props)=>{
    return(<div>
        {props.countrylist.map(country=><div key={country.name}>
            {country.name} <button
            onClick={()=>props.handleShow(props.countrylist.filter(indcountry => indcountry.name.toLowerCase().includes(country.name.toLowerCase())))}
            type="button">show</button> </div>)}
    </div>)
}

export default AllshowDisp