import { User } from 'lucide-react'

const teamMembers = [
  { name: 'John Doe', role: 'Founder & CEO' },
  { name: 'Jane Smith', role: 'CTO' },
  { name: 'Mike Johnson', role: 'Head of Customer Experience' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">About LuxeStay</h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-8 hover-glow-effect">
        <p className="text-lg mb-4">
          LuxeStay is a cutting-edge hotel recommendation platform designed to help travelers find their perfect accommodations. 
          We combine advanced AI algorithms with a curated selection of luxury hotels to provide personalized recommendations 
          that match your preferences and exceed your expectations.
        </p>
        <p className="text-lg">
          Our mission is to make every stay unforgettable by connecting discerning travelers with exceptional properties 
          around the world. Whether you're looking for a romantic getaway, a family vacation, or a business trip, 
          LuxeStay is your trusted partner in finding the ideal hotel that caters to your unique needs.
        </p>
      </div>
      <h2 className="text-2xl font-bold mb-6">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg text-center hover-glow-effect">
            <User size={48} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

