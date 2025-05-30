"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { roomTypes } from "../data/roomtypes";
import { propertyList } from "../data/propertyList";
import { countryCityMap } from "../data/countryCityMap";

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [starRating, setStarRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [roomtype, setRoomtype] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [property, setProperty] = useState("");
  const [userId, setUserId] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;
  const SEARCH_TERMS = [
    "luxury hotel",
    "resort",
    "beach villa",
    "spa suite",
    "penthouse",
    "modern hotel",
  ];

  const fetchRandomImage = async () => {
    const term = SEARCH_TERMS[Math.floor(Math.random() * SEARCH_TERMS.length)];
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${term}&per_page=10`,
        {
          headers: { Authorization: PEXELS_API_KEY },
        }
      );
      const data = await res.json();
      const photo =
        data.photos?.[Math.floor(Math.random() * data.photos.length)];
      return photo?.src?.medium || "/placeholder.svg";
    } catch {
      return "/placeholder.svg";
    }
  };

  const fetchRecommendations = async () => {
  try {
    setLoading(true);

    const res = await fetch('http://localhost:8000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomtype,
        country,
        city,
        property,
        starrating: starRating,
        user_id: userId || null,
      }),
    });

    const data = await res.json();

    // Add random image to each hotel result
    const enriched = await Promise.all(
      data.recommendations.slice(0, 5).map(async (hotel: any) => {
        const image = await fetchRandomImage();
        return { ...hotel, image };
      })
    );

    setRecommendations(enriched);
  } catch (err) {
    console.error('Failed to fetch recommendations:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">Search Hotels</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
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
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
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
                      starRating >= stars
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700"
                    } hover-glow-effect`}
                  >
                    <Star size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Amenities</label>
              {["Pool", "Spa", "Gym", "Restaurant", "Bar"].map((amenity) => (
                <div key={amenity} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAmenities([...selectedAmenities, amenity]);
                      } else {
                        setSelectedAmenities(
                          selectedAmenities.filter((a) => a !== amenity)
                        );
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={amenity}>{amenity}</label>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <Autocomplete
                options={roomTypes}
                value={roomtype}
                onChange={(_, newValue) => setRoomtype(newValue || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Room Type"
                    variant="outlined"
                    size="small"
                    sx={autocompleteStyle}
                  />
                )}
              />

              <Autocomplete
                options={Object.keys(countryCityMap)}
                value={country}
                onChange={(_, newValue) => {
                  setCountry(newValue || "");
                  setCity("");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    variant="outlined"
                    size="small"
                    sx={autocompleteStyle}
                  />
                )}
              />

              <Autocomplete
                options={country ? countryCityMap[country] || [] : []}
                value={city}
                onChange={(_, newValue) => setCity(newValue || "")}
                disabled={!country}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    variant="outlined"
                    size="small"
                    sx={autocompleteStyle}
                  />
                )}
              />

              <Autocomplete
                options={propertyList}
                value={property}
                onChange={(_, newValue) => setProperty(newValue || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Property"
                    variant="outlined"
                    size="small"
                    sx={autocompleteStyle}
                  />
                )}
              />

              <button
                onClick={fetchRecommendations}
                className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition"
              >
                Search Recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations Panel */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((hotel, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-200 hover-glow-effect"
                >
                  <Image
                    src={hotel.image}
                    alt={hotel.hotelname || "Hotel"}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {hotel.hotelname}
                    </h3>
                    <p className="text-gray-300">{hotel.roomtype}</p>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: hotel.starrating || 0 }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-yellow-500 mr-1"
                          />
                        )
                      )}
                    </div>
                    <Link
                      href={`/hotel/${index}`}
                      className="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors duration-200 hover-glow-effect"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-10 rounded text-center text-gray-400">
              Apply search filters to see recommended hotels.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Autocomplete dark mode styling
const autocompleteStyle = {
  backgroundColor: "#374151",
  borderRadius: 1,
  input: { color: "#fff" },
  label: { color: "#ccc" },
  ".MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "#555" },
    "&:hover fieldset": { borderColor: "#888" },
  },
};

// Skeleton card for shimmer effect
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-800 rounded-lg p-4 h-72">
      <div className="bg-gray-700 h-48 w-full rounded mb-4"></div>
      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-600 rounded w-1/2"></div>
    </div>
  );
}
