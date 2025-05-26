'use client';

import {
  User,
  BadgeCheck,
  BrainCog,
  MapPinned,
  Globe,
  ShieldCheck,
  BookOpen,
  Database,
  FileDown,
} from 'lucide-react';

const teamMembers = [
  { name: 'Dev Vatsa', role: 'Database & Recommendation Logic' },
  { name: 'Pratham Sharma', role: 'Frontend, UX Developer, Backend & API Architect' },
  { name: 'Rishi Raj Sinha', role: 'Database & Recommendation Logic' },
  { name: 'Jai Satyam Thakur', role: 'Recommendation Logic & Backend & API Architect' },
];

const features = [
  {
    title: 'Personalized Hotel Recommendations',
    description:
      'Use intelligent filters like room type, star rating, location, and property type to receive suggestions tailored to your exact needs.',
    icon: <BadgeCheck className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'AI-Powered Matching',
    description:
      'Behind the scenes, machine learning algorithms analyze your preferences and find the best possible matches.',
    icon: <BrainCog className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'Interactive Search Interface',
    description:
      'With real-time autocomplete, range sliders, and dynamic filters, explore hotels easily and intuitively.',
    icon: <Globe className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'Map-Based Hotel Discovery',
    description:
      'Visualize hotel locations and explore nearby options using an interactive map view.',
    icon: <MapPinned className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'Live Travel Blogs',
    description:
      'Read real-time hotel and resort-related articles fetched from Medium using RSS feeds.',
    icon: <BookOpen className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'Secure Authentication',
    description:
      'Login safely with GitHub using NextAuth.js, keeping your account secure while enabling personalization.',
    icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'FastAPI ML Backend',
    description:
      'Our backend is built on FastAPI and integrated with pre-trained recommendation models for real-time results.',
    icon: <Database className="w-6 h-6 text-yellow-400" />,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          About LuxeStay
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          LuxeStay is a smart hotel recommendation platform that helps travelers find their ideal stay through intelligent search, machine learning, and seamless user experience.
        </p>

        <a
          href="https://drive.google.com/your-report-link" // 🔁 replace with actual link
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-200 shadow hover:shadow-yellow-500/20"
        >
          <FileDown className="mr-2" />
          Download Project Report
        </a>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 p-8 rounded-xl shadow-md mb-16">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">What Our Platform Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-gray-900 p-4 rounded-lg hover:shadow-md hover:shadow-yellow-400/10 transition">
              {feature.icon}
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg text-center shadow-md hover:shadow-yellow-400/20 transition duration-200"
            >
              <User size={48} className="mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-gray-400 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
