'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const PEXELS_TERMS = ['hotel', 'resort', 'luxury room', 'villa', 'suite', 'beach resort', 'modern hotel', 'spa hotel'];

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

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRandomImage = async () => {
    const term = PEXELS_TERMS[Math.floor(Math.random() * PEXELS_TERMS.length)];
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${term}&per_page=1`, {
        headers: {
          Authorization: PEXELS_API_KEY!,
        },
      });
      const data = await res.json();
      return data.photos?.[0]?.src?.medium || '/placeholder.svg';
    } catch {
      return '/placeholder.svg';
    }
  };

  useEffect(() => {
    const loadSessionAndHotels = async () => {
      const res = await fetch('/api/auth/session');
      const sessionData = await res.json();
      setSession(sessionData);

      try {
        const hotelRes = await fetch('http://localhost:8000/hotels');
        const data = await hotelRes.json();
        const shuffled = data.hotels.sort(() => 0.5 - Math.random()).slice(0, 16);

        const hotelsWithImages = await Promise.all(
          shuffled.map(async (hotel: any) => {
            const image = await fetchRandomImage();
            return { ...hotel, image };
          })
        );

        setHotels(hotelsWithImages);
      } catch (err) {
        console.error('Failed to load hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSessionAndHotels();
  }, []);

  if (!session) {
    return <p className="text-center mt-10 text-red-500">You must be logged in to view this page.</p>;
  }

  return (
    <div className="p-6 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gray-900 rounded-xl mb-10">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">Hello, {session.user?.name} 👋</h1>
        <p className="text-gray-300 text-lg">Welcome to your LuxeStay Dashboard</p>
      </section>

      <Section title="Recommended Hotels" hotels={hotels.slice(0, 4)} loading={loading} />
      <Section title="Saved Hotels" hotels={hotels.slice(8, 12)} loading={loading} />
      <Section title="Recently Visited Hotels" hotels={hotels.slice(12, 16)} loading={loading} />
    </div>
  );
}

function Section({
  title,
  hotels,
  loading,
}: {
  title: string;
  hotels: any[];
  loading: boolean;
}) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : hotels.map((hotel, index) => (
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
                  <div className="flex items-center gap-1 mb-1">
                    {hotel.starrating
                      ? Array.from({ length: hotel.starrating }).map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400" />
                        ))
                      : <span className="text-sm text-gray-400">Not Rated</span>}
                  </div>
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
    </div>
  );
}
