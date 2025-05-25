'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const hotels = [
  { id: 1, name: 'Luxury Resort & Spa', lat: 40.7128, lng: -74.0060 },
  { id: 2, name: 'City Center Hotel', lat: 40.7589, lng: -73.9851 },
  { id: 3, name: 'Beachfront Paradise', lat: 40.7282, lng: -73.7949 },
]

export default function MapPage() {
  useEffect(() => {
    const map = L.map('map').setView([40.7128, -74.0060], 12)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)

    hotels.forEach(hotel => {
      L.marker([hotel.lat, hotel.lng])
        .addTo(map)
        .bindPopup(hotel.name)
    })

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Hotel Map</h1>
      <div id="map" className="w-full h-[600px] rounded-lg overflow-hidden hover-glow-effect"></div>
    </div>
  )
}

