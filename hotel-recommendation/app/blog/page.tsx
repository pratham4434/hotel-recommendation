'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;
const BLOG_TERMS = ['luxury hotel', 'hotel lobby', 'resort', 'spa'];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRandomImage = async () => {
    const term = BLOG_TERMS[Math.floor(Math.random() * BLOG_TERMS.length)];
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${term}&per_page=10`, {
        headers: { Authorization: PEXELS_API_KEY },
      });
      const data = await res.json();
      const photo = data.photos?.[Math.floor(Math.random() * data.photos.length)];
      return photo?.src?.medium || '/placeholder.svg';
    } catch {
      return '/placeholder.svg';
    }
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch('https://dummyjson.com/posts');
        const data = await res.json();

        const selected = data.posts.slice(0, 4);
        const enriched = await Promise.all(
          selected.map(async (post: any) => ({
            ...post,
            title: post.title,
            description: post.body.slice(0, 100) + '...',
            image: await fetchRandomImage(),
            author: `Author ${post.id}`,
            date: `2023-${(post.id % 12 + 1).toString().padStart(2, '0')}-0${post.id % 9 + 1}`,
          }))
        );

        setBlogs(enriched);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">LuxeStay Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-800 rounded-lg h-96 p-4">
                <div className="bg-gray-700 h-40 w-full mb-4 rounded" />
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-600 rounded w-1/2" />
              </div>
            ))
          : blogs.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-200 hover-glow-effect"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={250}
                  className="w-full h-48 object-cover"
                />
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
  );
}
