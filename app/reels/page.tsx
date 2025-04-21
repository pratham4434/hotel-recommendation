import { Play } from 'lucide-react'

const reels = [
  {
    id: 1,
    title: 'Sunset at Luxury Beach Resort',
    thumbnail: '/placeholder.svg',
    views: 15000,
  },
  {
    id: 2,
    title: 'Mountain Retreat Spa Experience',
    thumbnail: '/placeholder.svg',
    views: 12500,
  },
  {
    id: 3,
    title: 'City Skyline from Penthouse Suite',
    thumbnail: '/placeholder.svg',
    views: 18000,
  },
  {
    id: 4,
    title: 'Gourmet Dining at 5-Star Restaurant',
    thumbnail: '/placeholder.svg',
    views: 10000,
  },
  {
    id: 5,
    title: 'Luxury Pool Party',
    thumbnail: '/placeholder.svg',
    views: 20000,
  },
  {
    id: 6,
    title: 'Private Island Getaway',
    thumbnail: '/placeholder.svg',
    views: 25000,
  },
]

export default function ReelsPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">LuxeStay Reels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reels.map((reel) => (
          <div key={reel.id} className="relative group">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden hover-glow-effect">
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="mt-2 text-lg font-semibold">{reel.title}</h3>
            <p className="text-sm text-gray-400">{reel.views.toLocaleString()} views</p>
          </div>
        ))}
      </div>
    </div>
  )
}

