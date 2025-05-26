import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;
const BLOG_TERMS = ['luxury hotel', 'hotel lounge', 'resort', 'spa retreat'];

async function fetchBlog(id: string) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

async function fetchRandomImage() {
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
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = await fetchBlog(params.id);
  if (!blog) return notFound();

  const image = await fetchRandomImage();

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <Image
        src={image}
        alt="Blog Banner"
        width={1000}
        height={400}
        className="rounded-lg w-full h-64 object-cover mb-6"
      />

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-4">By Author {blog.id} • 2023-{(blog.id % 12) + 1}-0{(blog.id % 9) + 1}</p>

      <article className="text-lg leading-relaxed text-gray-300 mb-8">
        {blog.body.split('\n').map((para: string, idx: number) => (
          <p key={idx} className="mb-4">{para}</p>
        ))}
      </article>

      <Link
        href="/blog"
        className="inline-block bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors duration-200"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
}
