'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Search } from 'lucide-react'

const hotels = [
  { id: 1, name: 'Luxury Resort & Spa', image: '/placeholder.svg', price: 299, stars: 5, amenities: ['Pool', 'Spa', 'Gym'] },
  { id: 2, name: 'City Center Hotel', image: '/placeholder.svg', price: 199, stars: 4, amenities: ['Restaurant', 'Bar', 'Business Center'] },
  { id: 3, name: 'Beachfront Paradise', image: '/placeholder.svg', price: 349, stars: 5, amenities: ['Private Beach', 'Water Sports', 'Infinity Pool'] },
  { id: 4, name: 'Mountain Retreat', image: '/placeholder.svg', price: 249, stars: 4, amenities: ['Hiking Trails', 'Ski Resort', 'Fireplace'] },
  { id: 5, name: 'Historic Downtown Inn', image: '/placeholder.svg', price: 179, stars: 3, amenities: ['Free Breakfast', 'Guided Tours', 'Antique Furnishings'] },
]

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [starRating, setStarRating] = useState(0)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const filteredHotels = hotels.filter((hotel) => {
    return (
      hotel.price >= priceRange[0] &&
      hotel.price <= priceRange[1] &&
      hotel.stars >= starRating &&
      (selectedAmenities.length === 0 || selectedAmenities.every((amenity) => hotel.amenities.includes(amenity)))
    )
  })

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Search Hotels</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="bg-gray-800 p-6 rounded-lg hover-glow-effect">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Price Range</label>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Star Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setStarRating(stars)}
                    className={`p-2 rounded ${
                      starRating >= stars ? 'bg-yellow-500 text-black' : 'bg-gray-700'
                    } hover-glow-effect`}
                  >
                    <Star size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Amenities</label>
              {['Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'].map((amenity) => (
                <div key={amenity} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAmenities([...selectedAmenities, amenity])
                      } else {
                        setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={amenity}>{amenity}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-200 hover-glow-effect"
              >
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                  <p className="text-yellow-500 font-bold">${hotel.price}/night</p>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: hotel.stars }).map((_, index) => (
                      <Star key={index} size={16} className="text-yellow-500 mr-1" />
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">{hotel.amenities.join(', ')}</p>
                  </div>
                  <Link
                    href={`/hotel/${hotel.id}`}
                    className="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors duration-200 hover-glow-effect"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

