import React from 'react'
import {useSelector} from "react-redux";

const Notification = (props) => {
  const notification =useSelector(state=>state.notif.info)
  const style = {
    border: 'solid',
    padding: 5,
    borderWidth: 1
  }
  console.log("Noti",notification)
  if (notification){
    console.log("here")
    return (<div style={style}>
      {notification}
    </div>)


  }else{
    return null;
  }

}

export default Notification