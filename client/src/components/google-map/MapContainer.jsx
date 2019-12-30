import React, { Component ,Fragment} from 'react';
import GoogleMapReact from 'google-map-react';
import MapAutoComplete from './MapAutoComplete';
import PlaceCard from './PlaceCard';
class MapsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curCord:{lat:this.props.lat,lng:this.props.lng},
      mapsLoaded: false,
      map: {},
      mapsApi: {},
      currentLatLng: {},
      autoCompleteService: {},
      placesService: {},
      geoCoderService: {}
    };
  }
// Runs once when the Google Maps library is ready
  // Initializes all services that we need
  apiHasLoaded = ((map, mapsApi) => {
    this.setState({
      mapsLoaded: true,
      map,
      mapsApi,
      currentLatLng: new mapsApi.LatLng(this.state.curCord.lat,this.state.curCord.lng),
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      geoCoderService: new mapsApi.Geocoder()
    });
  });
  renderMarkar(){
    const {curCord, mapsApi, map,placesService} = this.state;
    const myMarker= new mapsApi.Marker({position: { lat:curCord.lat, lng:curCord.lng },
       map, draggable:true,animation:mapsApi.Animation.DROP}); 
    mapsApi.event.addListener(myMarker, 'click', function (obj) {
          console.log(obj);
    });
    mapsApi.event.addListener(myMarker, 'dragend', function(evt){
      const placesRequest = {
        location: evt.latLng,
        types: ['restaurant', 'cafe'],
        name:"restaurant",
        rankBy: mapsApi.places.RankBy.DISTANCE,
        radius: 1000, 
      };
      placesService.nearbySearch(placesRequest,(results)=> {
        console.log(results); 
      });
  });
  }
  render() {
    const { mapsLoaded, currentLatLng,placesService, geoCoderService ,curCord } = this.state;
    return (
      <Fragment>
        <div className="col-12 mt-5">
          {mapsLoaded ?
                  <div  className="mb-4 d-flex map-autocomplete">
                      <MapAutoComplete
                        placesService={placesService}
                        currentLatLng={currentLatLng}
                        markerName={"Restaurent"}
                      />
                      <div className="addPlaceCard">
                        {/* <PlaceCard info={}></PlaceCard> */}
                      </div>
                  </div>
            : <Fragment></Fragment>
          }
        </div>
        <div className="col-12 " style={{ height: '75vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDJxZ08Sa0v1nhW6PoPxa8LXBmmBq0oMTc',
              libraries: ['places']
            }}
            defaultZoom={15}
            defaultCenter={curCord}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)} // "maps" is the mapApi. Bad naming but that's their library.
          />{mapsLoaded ?this.renderMarkar():null}
        </div>
      </Fragment>
    )
  }
}

export default MapsContainer;