import React,{Component} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
const google=window["google"];

class AutoCompleteCustom extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = (address,placeId) => {
      this.setState({ address });
      this.props.history.push("/restaurant/"+placeId);
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{ location: new google.maps.LatLng(this.props.position.lat,this.props.position.lng), radius: 5000,type: ['retaurant','cafe']}}
        shouldFetchSuggestions={this.state.address.length > 0}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({placeholder: 'Search Places ...', className: 'form-control'})}/>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const style = suggestion.active ? { backgroundColor: '#fafafa' } : { backgroundColor: '#ffffff' };
                return (
                  <div {...getSuggestionItemProps(suggestion, {className:"suggestion-item",style,})}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default AutoCompleteCustom;