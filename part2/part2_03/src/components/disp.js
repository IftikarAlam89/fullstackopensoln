import React from "react";
import NoShowDisp from "./noshow";
import AllshowDisp from "./showcountries";
import Details from "./detailsShow";
import Searchbar from "./search";
import Weatherdets from "./weather";


const Disp=({searchmethod,searchitem,results,countrylist,handleShow,apires})=> {

    if (results.length>10){
        return(<div>
            <Searchbar searchmethod={searchmethod} searchItem={searchitem}/><br/>
            <NoShowDisp/>
        </div>)
    }else{
        if (results.length>1){
            return (<div>
                <Searchbar searchmethod={searchmethod} searchItem={searchitem}/> <br/>
            <AllshowDisp countrylist={countrylist} handleShow={handleShow} />
            </div>)
        }else{
            if (results.length===1){

                return (<div>
                    <Searchbar searchmethod={searchmethod} searchItem={searchitem}/><br/>
                    <Details country={countrylist[0]} />
                    <Weatherdets country={countrylist[0]} apires={apires}/>
                </div>)
            }else{

            }return (<div>
                <Searchbar searchmethod={searchmethod} searchItem={searchitem}/><br/>
            </div>)
        }
    }
}
export default Disp