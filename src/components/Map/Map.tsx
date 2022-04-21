import React from 'react';
import GoogleMapReact from 'google-map-react';
import {ReactSVG} from "react-svg";
import {useTranslation} from "react-i18next";

const Map : React.FC = () => {
  const { t } = useTranslation();
  const envGoogleMapApiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  const renderMarkers = (map: any, maps: any) => {
    return new maps.Marker({
      position: {lat:  -37.997991, lng: -60.499003},
      map,
      title: 'De la Garma, Buenos Aires!'
    });
  };

  return (
    <div className="w-full relative grid grid-cols-2 rounded-lg border-blue border-2 shadow">
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 t-1 flex flex-row justify-between px-4 py-1 bg-blue rounded-lg border-blue border-2 shadow min-w-150 md:hidden">
        <ReactSVG
          src="icons/marker.svg"
          beforeInjection={(svg) => {
            svg.classList.add('fill-white');
            svg.classList.add('text-sm');
            svg.classList.add('md:text-lg');
          }}
        />
        <p className="text-white font-bold text-xs ml-2">De la Garma, Buenos Aires</p>
      </div>
      <div className="rounded-l-lg">
      <GoogleMapReact
        bootstrapURLKeys={{ key: envGoogleMapApiKey }}
        defaultZoom={16}
        defaultCenter={{lat: -37.997991, lng: -60.499003}}
        options={{ mapTypeId: "satellite", fullscreenControl: false }}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >
      </GoogleMapReact>
      </div>
      <div
        className="min-h-[13rem] bg-center bg-cover rounded-r-lg md:min-h-[20rem] relative"
        style={{ backgroundImage: "url(images/photos/geoloc.png)"}}
      >
        <div className="absolute hidden top-3 left-5 transform z-10 t-1 md:flex flex-row justify-between px-4 py-1 bg-blue rounded-lg border-blue border-2 shadow">
          <ReactSVG
            src="icons/marker.svg"
            beforeInjection={(svg) => {
              svg.classList.add('fill-white');
              svg.classList.add('text-sm');
              svg.classList.add('md:text-lg');
            }}
          />
          <p className="text-white font-bold text-xs ml-2">{t("home.map.location")}</p>
        </div>
      </div>
    </div>
  )
}

export default Map;