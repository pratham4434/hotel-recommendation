import Image from 'next/image'
import Link from 'next/link'

const featuredHotels = [
  { id: 1, name: 'Luxury Resort & Spa', image: '/placeholder.svg', price: '$299/night' },
  { id: 2, name: 'City Center Hotel', image: '/placeholder.svg', price: '$199/night' },
  { id: 3, name: 'Beachfront Paradise', image: '/placeholder.svg', price: '$349/night' },
  { id: 4, name: 'Mountain Retreat', image: '/placeholder.svg', price: '$249/night' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
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

      <section className="featured-hotels mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredHotels.map((hotel) => (
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
                <p className="text-yellow-500 font-bold">{hotel.price}</p>
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
      </section>

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
  )
}

