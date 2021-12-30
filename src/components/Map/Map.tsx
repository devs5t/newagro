import React from 'react';
import GoogleMapReact from 'google-map-react';
import {ReactSVG} from "react-svg";


const stylesArr = [
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#3e606f"
      },
      {
        "weight": 2
      },
      {
        "gamma": 0.84
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "weight": 0.6
      },
      {
        "color": "#1a3541"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c5a71"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#406d80"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c5a71"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#29768a"
      },
      {
        "lightness": -37
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#406d80"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#193341"
      }
    ]
  }
];

const Map : React.FC = () => {
  return (
    <div className="w-full relative grid grid-cols-2 rounded-lg border-blue border-2 shadow">
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 md:left-2/3 md:-translate-x-2/3 z-10 t-1 flex flex-row justify-between px-4 py-1 bg-blue rounded-lg border-blue border-2 shadow min-w-150">
        <ReactSVG
          src="icons/marker.svg"
          beforeInjection={(svg) => {
            svg.classList.add('text-sm');
            svg.classList.add('md:text-lg');
          }}
        />
        <p className="text-white font-bold text-xs ml-2">Tandil, Buenos Aires</p>
      </div>
      <div className="rounded-l-lg">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBzrF58IbSxDx-vRr2RxYpD3yapbs-TcQI' }}
        defaultZoom={11}
        defaultCenter={{lat: -37.232749, lng: -59.101886}}
        options={{ styles: stylesArr, fullscreenControl: false }}
      >
      </GoogleMapReact>
      </div>
      <div
        className="min-h-[13rem] bg-center bg-cover rounded-r-lg md:min-h-[20rem]"
        style={{ backgroundImage: "url(images/photos/geoloc.png)"}}
      />
    </div>
  )
}

export default Map;