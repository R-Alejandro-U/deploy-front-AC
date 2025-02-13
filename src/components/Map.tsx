/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src, 
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
}

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  markers: MarkerData[];
}

import { useMemo } from 'react';

const Map = ({ center, zoom, markers }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const memoizedMarkers = useMemo(() => {
    return markers.map(marker => 
      L.marker([marker.lat, marker.lng])
        .bindPopup(marker.title)
    );
  }, [markers]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([center.lat, center.lng], zoom);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    memoizedMarkers.forEach(marker => marker.addTo(map));

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, zoom, memoizedMarkers]);

  return <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }} />;
};


export default Map
