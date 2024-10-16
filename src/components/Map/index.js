import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import currentPositionImg from "../../assets/images/Base/current-position.png";

const position = [51.58, -0.09];

export default function Map() {
  // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  const icon = L.icon({
    iconUrl: currentPositionImg,
    iconSize: [38, 38],
  });
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`${process.env.REACT_APP_API_MAP}`}
      />
      <Marker position={position} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
