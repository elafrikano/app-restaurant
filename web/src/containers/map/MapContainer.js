import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const style = {
  width: "95%",
  height: "100%"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {
        name: "Lugar"
      }
    };
  }

  render() {
    const { initialCenter, onMapClicked, center, markers } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={style}
        initialCenter={initialCenter}
        center={center}
        onClick={onMapClicked}
      >
        {markers.map((marker, index) => {
          const point = marker.coordinates.split(",");
          return (
            <Marker
              name={marker.name}
              title={marker.name}
              key={index}
              position={{ lat: point[0], lng: point[1] }}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper(props => ({
  language: "es",
  apiKey: "AIzaSyCnfzdYb8IR3KbAI9oKs0WJSseiC6skj4Y"
}))(MapContainer);
