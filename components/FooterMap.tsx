"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix Leaflet's default icon issue in Next.js/Webpack
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function FooterMap() {
  // Lampung Coordinates
  const position: [number, number] = [-5.4254, 105.2580];

  return (
    <div className="h-40 w-full rounded-xl overflow-hidden border border-white/20 relative z-0">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={position} icon={icon}>
          <Popup>
            Lampung, Indonesia <br /> Bagas Permana
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
