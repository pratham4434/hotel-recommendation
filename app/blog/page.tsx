import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: '10 Must-Visit Luxury Hotels in 2023',
    description: 'Discover the most exquisite and lavish hotels around the world that promise an unforgettable stay.',
    author: 'Jane Doe',
    date: 'May 15, 2023',
  },
  {
    id: 2,
    title: 'The Art of Hotel Design: Blending Luxury and Sustainability',
    description: 'Explore how modern hotels are incorporating eco-friendly practices without compromising on luxury and comfort.',
    author: 'John Smith',
    date: 'June 2, 2023',
  },
  {
    id: 3,
    title: 'Culinary Journeys: Top Hotel Restaurants Around the Globe',
    description: 'Embark on a gastronomic adventure as we showcase the finest dining experiences in luxury hotels worldwide.',
    author: 'Emily Chen',
    date: 'June 20, 2023',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">LuxeStay Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-200 hover-glow-effect">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-400 mb-4">{post.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <Link
                href={`/blog/${post.id}`}
                className="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors duration-200 hover-glow-effect"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

