import Image from 'next/image'
import Link from 'next/link'

const recommendedHotels = [
  { id: 1, name: 'Luxury Resort & Spa', image: '/placeholder.svg', price: '$299/night' },
  { id: 2, name: 'City Center Hotel', image: '/placeholder.svg', price: '$199/night' },
  { id: 3, name: 'Beachfront Paradise', image: '/placeholder.svg', price: '$349/night' },
]

const recentlyViewedHotels = [
  { id: 4, name: 'Mountain Retreat', image: '/placeholder.svg', price: '$249/night' },
  { id: 5, name: 'Historic Downtown Inn', image: '/placeholder.svg', price: '$179/night' },
]

const savedHotels = [
  { id: 6, name: 'Seaside Villa', image: '/placeholder.svg', price: '$399/night' },
  { id: 7, name: 'Urban Loft Hotel', image: '/placeholder.svg', price: '$229/night' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome, User!</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recommended Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
        <div className="flex overflow-x-auto space-x-6 pb-4">
          {recentlyViewedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} className="w-64 flex-shrink-0" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Saved Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>
    </div>
  )
}

function HotelCard({ hotel, className = '' }) {
  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-200 hover-glow-effect ${className}`}>
      <Image
        src={hotel.image}
        alt={hotel.name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
        <p className="text-yellow-500 font-bold">{hotel.price}</p>
        <Link
          href={`/hotel/${hotel.id}`}
          className="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors duration-200 hover-glow-effect"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

