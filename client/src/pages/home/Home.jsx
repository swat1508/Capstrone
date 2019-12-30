import React, { Fragment, useState,useEffect } from 'react'
import homeBanner from '../../images/home-banner.jpg';
import './home.scss';
//import MapContainer from "../../components/google-map/MapContainer";
import AutoCompleteCustom from '../../components/autocomplete/AutoCompleteCustom';
import RestaurantList from '../../components/resto-list/RestaurantList';
const restaurentData=[{
  "address":"Shop No-2, Building No. 13, Ground Floor, Rehinus Street, Richmond Town, Bengaluru, Karnataka 560025",
  "name":"Domino's Pizza",
  "image":"/assets/user.jpg",
  "placeId":"ChIJ39KZrtYVrjsRqmN_Q8V8d0g",
  position:{lat:12.5647,lng:78.3245},
  feedbacks:[],
  types: [
    "meal_delivery",
    "meal_takeaway",
    "restaurant",
    "food",
    "point_of_interest",
    "establishment"
  ],
},
{
  "address":"Shop No-2, Building No. 13, Ground Floor, Rehinus Street, Richmond Town, Bengaluru, Karnataka 560025",
  "name":"Domino's Pizza",
  "image":"/assets/user.jpg",
  "placeId":"ChIJ39KZrtYVrjsRqmN_Q8V8d0g3",
  position:{lat:12.5647,lng:78.3245},
  feedbacks:[],
  types: [
    "meal_delivery",
    "meal_takeaway",
    "restaurant",
    "food",
    "point_of_interest",
    "establishment"
  ],
},
{
  "address":"Shop No-2, Building No. 13, Ground Floor, Rehinus Street, Richmond Town, Bengaluru, Karnataka 560025",
  "name":"Domino's Pizza",
  "image":"/assets/user.jpg",
  "placeId":"ChIJ39KZrtYVrjsRqmN_Q8V8d0g2",
  position:{lat:12.5647,lng:78.3245},
  feedbacks:[],
  types: [
    "meal_delivery",
    "meal_takeaway",
    "restaurant",
    "food",
    "point_of_interest",
    "establishment"
  ],
},
{
  "address":"Shop No-2, Building No. 13, Ground Floor, Rehinus Street, Richmond Town, Bengaluru, Karnataka 560025",
  "name":"Domino's Pizza eal_delivery eal_delivery",
  "image":"/assets/user.jpg",
  "placeId":"ChIJ39KZrtYVrjsRqmN_Q8V8d0g1",
  position:{lat:12.5647,lng:78.3245},
  feedbacks:[],
  types: [
    "meal_delivery",
    "meal_takeaway",
    "restaurant",
    "food",
    "point_of_interest",
    "establishment"
  ],
}]
export default ({history})=> {
  const [position,setPosition]=useState({lat:12.9716,lng:77.5946});
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) =>{
      setPosition({lat:position.coords.latitude,lng:position.coords.longitude})
    })
  },[])
    return (
        <Fragment>
        <div className="home" id="home-page">
            <div className="row">
                <div className="col-sm-12">
                  <div className="home-banner mt-3 border-bottom border-light">
                    <img src={homeBanner} alt="home banner" className="w-100 mb-3"/>
                    <div className="col-8 center-container p-5 bg-white rounded">
                        <h1 className="text-dark text-center h3">Search Restaurent.</h1>
                        <div className="auto-complete mt-3">
                          {position?<AutoCompleteCustom history={history} position={position}/>:null}
                        </div>
                    </div>
                  </div>
                  <div className="top-restaurent">
                    <h3 className="mb-4 text-center section-header">Top 10 Rated Restaurent</h3>
                    <div className="d-flex flex-wrap justify-content-center">
                    {restaurentData.map((restaurent)=>{
                      return <RestaurantList restoData={restaurent} key={restaurent.placeId}/>
                    })}
                    </div>
                  {/* <MapContainer lng={position.lng} lat={position.lat}/>               */}
                  
                  </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}
