
import React from "react";
import {Link} from 'react-router-dom';
import './restaurant-list.scss';
import homeBanner from '../../images/home-banner.jpg';
function RestaurantList({restoData}){
    return(
        <div className="col-lg-3 col-md-6 restaurant-list-item mb-2 rounded px-1">
            <div className="restaurant-list-img border-">
                <img src={homeBanner} alt="related-media" className="w-100 "/>
            </div>
            <div className="restaurant-list-section bg-secondary text-white px-4 h6">
            <div className="h4 font-weight-bold pt-3">{restoData.name}</div>
            <address className="restaurant-list-body para my-3">
               {restoData.address}
            </address>
            <div className="restaurant-list-label font-weight-bold">Types</div>
            <div className="restaurant-list-type d-flex flex-wrap mt-2 mb-3">
            {restoData.types.map((type)=>{
                return <div className=" px-2 border-right border-light small" key={type}>{type}</div>
            })}
            </div>
            <div className="restaurant-list-link pb-4">
                <Link to={"/restaurant/"+restoData.placeId} className="font-weight-bold p-2 btn btn-outline-light">Write Your Review</Link>
            </div>
            </div>
        </div>          
    );
}
export default RestaurantList;