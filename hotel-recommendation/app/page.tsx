'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

const searchTerms = ['hotel', 'resort', 'luxury suite', 'beach villa', 'spa room', 'penthouse', 'modern room', 'mountain lodge'];


export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-800 rounded-lg h-80 p-4">
      <div className="bg-gray-700 h-48 w-full rounded mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-600 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-600 rounded w-2/3"></div>
    </div>
  );
}

export default function Home() {
  const [featuredHotels, setFeaturedHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRandomImage = async () => {
    const query = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&page=${Math.ceil(
          Math.random() * 5
        )}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY!,
          },
        }
      );
      const data = await res.json();
      const photo = data.photos?.[Math.floor(Math.random() * data.photos.length)];
      return photo?.src?.medium || '/placeholder.svg';
    } catch (error) {
      console.error('Pexels fetch error:', error);
      return '/placeholder.svg';
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('http://localhost:8000/hotels');
        const data = await res.json();

        const shuffled = data.hotels.sort(() => 0.5 - Math.random()).slice(0, 8);

        const hotelsWithImages = await Promise.all(
          shuffled.map(async (hotel: any) => {
            const image = await fetchRandomImage();
            return { ...hotel, image };
          })
        );

        setFeaturedHotels(hotelsWithImages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero bg-gray-900 text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 glow-effect">
          Discover Your Perfect Stay
        </h1>
        <p className="text-xl mb-8">Luxury accommodations tailored to your preferences</p>
        <Link
          href="/search"
          className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 hover-glow-effect"
        >
          Start Exploring
        </Link>
      </section>

      {/* Featured Hotels */}
      <section className="featured-hotels mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
            : featuredHotels.map((hotel, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-200 hover-glow-effect"
                >
                  <Image
                    src={hotel.image}
                    alt={hotel.hotelname}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{hotel.hotelname}</h3>
                    <p className="text-yellow-500 font-bold">
                      {hotel.starrating ? `${hotel.starrating}★` : 'Not Rated'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {hotel.city}, {hotel.country}
                    </p>
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
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Join LuxeStay Today</h2>
        <div className="flex justify-center space-x-4">
          <Link
            href="/login"
            className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 hover-glow-effect"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-transparent border border-yellow-500 text-yellow-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-500 hover:text-black transition-colors duration-200 hover-glow-effect"
          >
            Register
          </Link>
        </div>
      </section>
    </div>
  );
}
