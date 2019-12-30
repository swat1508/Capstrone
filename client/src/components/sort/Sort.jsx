
import React from "react";

function SortComponent({updateQuery}){
    return(
        <div className="input-group p-3">
            <select  className="form-control" onChange={event=>{updatePizzaListOrder(event,updateQuery)}}>
                <optgroup label="Increasing Order">
                    <option value="title" title="asc">Title</option>
                    <option value="price" title="asc">Price</option>
                </optgroup>
                <optgroup label="Decreasing Order">
                    <option value="title" title="desc">Title</option>
                    <option value="price" title="desc">Price</option>
                </optgroup>
            </select>
        </div>
    );
}
function updatePizzaListOrder(event,updateQuery){
    const title= event.target.options[event.target.options.selectedIndex].title;
    const curValue=event.target.value;
    updateQuery({sortBy:curValue,sortType:title});      
}
export default SortComponent;