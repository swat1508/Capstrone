import React ,{ useEffect,useState }from 'react';
import { createNewRestaurant } from '../../services/restaurent-service';
const google=window["google"];
export default ({match})=> {
    const [restaurantData,setRestaurentData]=useState({});
    const [error,setError]=useState({});
    useEffect(()=>{
        new google.maps.places.PlacesService(document.createElement('div')).getDetails({placeId:match.params.restaurantId},(resp)=>{
        if(resp){
            const restObj={
                address:resp.formatted_address,
                name:resp.name,
                placeId:resp.place_id,
                types:resp.types,
                website:resp.website,
                phone:resp.international_phone_number,
                position:resp.geometry.location,
                icon:resp.icon
            }  
            createNewRestaurant(restObj).then(result=>{
                setRestaurentData(restObj) 
            }).catch(err=>{
                setError(err.message);
            })       
        }
       })
    },[match.params.restaurantId]);
   const getRestaurantHmtl=(data)=>{
      return( <div className="col-sm-12">
                <div className="hero-banner">
                    <img src="" alt=""/>
                </div>
                <div className="d-flex flex-wrap justify-content-between my-3">
                    <span> {JSON.stringify(data)} </span>        
                </div>
            </div>
        )
    }
   const getErrorHtml=(err)=>{

    }
    return (
        <div className="home" id="home-page">
            <div className="row">
               {error?getErrorHtml(error):getRestaurantHmtl(restaurantData)}
            </div>
        </div>
    )
}
