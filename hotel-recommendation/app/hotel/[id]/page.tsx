'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function HotelDetails() {
  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const nameRes = await fetch('https://fakerapi.it/api/v1/companies?_quantity=1');
        const nameData = await nameRes.json();
        const hotelName =
          nameData?.data?.[0]?.name || 'LuxeStay Premier Suites';

        const imageRes = await fetch(
          'https://api.pexels.com/v1/search?query=hotel&per_page=3',
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
            },
          }
        );
        const imageData = await imageRes.json();
        const images = imageData?.photos?.map((p: any) => p.src.medium) || [
          '/placeholder.svg',
          '/placeholder.svg',
          '/placeholder.svg',
        ];

        setHotel({
          id: 1,
          name: hotelName,
          images,
          description:
            'Experience ultimate luxury at our resort and spa. Nestled in a picturesque location, our hotel offers world-class amenities and unparalleled service.',
          price: Math.floor(200 + Math.random() * 300),
          stars: Math.floor(4 + Math.random() * 2),
          amenities: [
            'Pool',
            'Spa',
            'Gym',
            'Restaurant',
            'Bar',
            'Room Service',
            'Free Wi-Fi',
          ],
          reviews: [
            {
              id: 1,
              user: 'John D.',
              rating: 5,
              comment:
                'Absolutely amazing experience! The staff was incredibly attentive and the facilities were top-notch.',
            },
            {
              id: 2,
              user: 'Sarah M.',
              rating: 4,
              comment:
                'Beautiful resort with great amenities. The spa treatments were particularly enjoyable.',
            },
            {
              id: 3,
              user: 'Michael R.',
              rating: 5,
              comment:
                'Exceeded all expectations. The room was spacious and luxurious, and the views were breathtaking.',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch hotel info:', error);
      }
    };

    fetchHotel();
  }, []);

  if (!hotel) {
    return (
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="space-y-4">
          <div className="bg-gray-700 h-64 w-full rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 h-32 rounded-lg" />
            <div className="bg-gray-700 h-32 rounded-lg" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg space-y-4">
          <div className="h-6 bg-gray-700 w-3/4 rounded" />
          <div className="h-6 bg-yellow-500 w-1/2 rounded" />
          <div className="flex space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-5 h-5 bg-yellow-500 rounded" />
            ))}
          </div>
          <div className="h-4 bg-gray-700 w-1/3 rounded" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 bg-gray-700 rounded" />
            ))}
          </div>
          <div className="h-10 bg-yellow-500 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{hotel.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <Image
            src={hotel.images[0]}
            alt={hotel.name}
            width={600}
            height={400}
            className="w-full h-64 object-cover rounded-lg hover-glow-effect"
          />
          <div className="grid grid-cols-2 gap-4">
            {hotel.images.slice(1).map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={`${hotel.name} - Image ${index + 2}`}
                width={300}
                height={200}
                className="w-full h-32 object-cover rounded-lg hover-glow-effect"
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg hover-glow-effect">
          <p className="text-lg mb-4">{hotel.description}</p>
          <p className="text-2xl font-bold text-yellow-500 mb-4">${hotel.price} / night</p>
          <div className="flex items-center mb-4">
            {Array.from({ length: hotel.stars }).map((_, index) => (
              <Star key={index} className="text-yellow-500 mr-1" />
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2">Amenities</h2>
          <ul className="grid grid-cols-2 gap-2 mb-6">
            {hotel.amenities.map((amenity: string) => (
              <li key={amenity} className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                {amenity}
              </li>
            ))}
          </ul>
          <button className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md font-semibold hover:bg-yellow-400 transition-colors duration-200 hover-glow-effect">
            Book Now
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg hover-glow-effect">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-4">
          {hotel.reviews.map((review: any) => (
            <div key={review.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{review.user}</span>
                <div className="flex items-center">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={16} className="text-yellow-500 mr-1" />
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-lg hover-glow-effect">
        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="rating" className="block mb-2 text-sm font-medium">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((stars) => (
                <button
                  key={stars}
                  type="button"
                  className="p-2 rounded bg-gray-700 hover:bg-yellow-500 hover:text-black transition-colors duration-200"
                >
                  <Star size={16} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block mb-2 text-sm font-medium">
              Comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 input-glow"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-black py-2 px-4 rounded-md font-semibold hover:bg-yellow-400 transition-colors duration-200 hover-glow-effect"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
