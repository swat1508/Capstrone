import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import {withRouter} from 'react-router-dom';
const MapAutoComplete =({ placesService, currentLatLng,history} )=> {
  const[dataSource,setDataSource]=useState([]);
  const onSelect = ((value) => {
    console.log(value);
      history.push({
        pathname: '/restaurant/'+value
      })
  });

  function renderOption(item) {
    return (
      <AutoComplete.Option key={item.placeId} id={item.placeId}>
        <div>{item.name+","+item.address }</div>
      </AutoComplete.Option>
    );
  }
  // Runs a search on the current value as the user types in the AutoComplete field.
  const handleSearch = ((value) => {
    // Search only if there is a string
    if (value.length>1) {
      const searchQuery = {
        location: currentLatLng,
        types: ["restaurant"],
        query:value
      };
      placesService.textSearch(searchQuery, ((response) => {
        if (response) {
          setDataSource(response.map(resp => {
            return({name:resp.name,address:resp.formatted_address,placeId:resp.place_id});
          }));
        }
      }));
    }
  });

    return (
      <AutoComplete className="w-100" 
      dataSource={dataSource.map(renderOption)}
      onSelect={onSelect} 
      onSearch={handleSearch}
      placeholder="Search Restaurant ..."/>
    );
}
export default withRouter(MapAutoComplete);