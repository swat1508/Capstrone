
import React from "react";
function SearchComponent({updateQuery}){
    return(
        <div className="input-group p-3">
            <input type="text" className="form-control" id="searchQuery" placeholder="Coupon Code"/>
            <div className="input-group-append">
                <button type="button" className="btn btn-primary" onClick={()=> {updateSearchQuery(updateQuery)}}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
}
function updateSearchQuery(updateQuery){
    var searchQuery=document.getElementById("searchQuery").value.trim();
    updateQuery({searchQuery: searchQuery.trim()});
}
export default SearchComponent;