'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/hotel'
        );
        const data = await res.json();
        const posts = data.items.slice(0, 6); // Get top 6
        setBlogs(posts);
      } catch (err) {
        console.error('Failed to fetch Medium blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 lg:px-20">
      <h1 className="text-4xl font-bold mb-10 text-center">Hotel Blog Highlights</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-800 rounded-lg h-72 p-4" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.slice(0, 4).map((blog: any, index: number) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {blogs.slice(4, 6).map((blog: any, index: number) => (
            <BlogCard key={index + 4} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogCard({ blog }: { blog: any }) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-yellow-500/10 transition-shadow duration-300">
      {blog.thumbnail && (
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          width={800}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h2 className="text-xl font-bold text-yellow-400 mb-2">{blog.title}</h2>
        <p
          className="text-sm text-gray-300 mb-3"
          dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 150) + '...' }}
        />
        <div className="text-xs text-gray-500 mb-3">
          By {blog.author} • {new Date(blog.pubDate).toDateString()}
        </div>
        <Link
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 font-semibold transition-colors duration-200"
        >
          Read on Medium
        </Link>
      </div>
    </div>
  );
}
