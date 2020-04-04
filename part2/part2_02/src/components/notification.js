import React from "react";

const Notification=({message,error})=>{
    const notStyle = {
        color: !error? 'green':'red',
        background: 'lightgrey',
        fontSize: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message===null){
        return null
    }else{
        return (<div className={"error"} style={notStyle}>{message}</div>)
    }
}

export default Notification;
