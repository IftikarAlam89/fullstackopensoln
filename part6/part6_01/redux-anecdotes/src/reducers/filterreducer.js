


export const filtered =(content)=>{
    return{
        type:'Filter',
        searchitem: content,

    }
}


const filterreducer =(state="",action)=>{

    switch (action.type){
        case 'Filter':{
            const newState=action.searchitem
            return newState
        }
        default:
            return state
    }
}

export default filterreducer