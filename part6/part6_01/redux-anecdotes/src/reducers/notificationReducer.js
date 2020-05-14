let timeoutID = null

export const setNotification=(info,timeVisible)=>{
     return async (dispatch)=>{
         dispatch({
             type: 'SET_NOTI',
             data: {
                 error: true, info: info, timeout:null
             }});
         timeoutID = setTimeout(()=>dispatch({
             type: 'REM_NOTIFICATION',
             data: {error:true,info:null}
         }),timeVisible* 1000)
     }
}


const initialState={error:false,info:null, timeout:null}



const notifreducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'SET_NOTI' :{
            if (timeoutID){
                clearTimeout(timeoutID)
            }
            const newstate=action.data
            return newstate

        }
        case 'REM_NOTIFICATION' :{
            const newstate=action.data
            return newstate
        }
        default:
            return state


    }
}

export  default notifreducer