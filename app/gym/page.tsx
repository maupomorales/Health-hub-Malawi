"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Clock,
  Dumbbell,
  Star,
  ArrowLeft,
  Search,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const gyms = [
  {
    id: 1,
    name: "FitLife Gym Blantyre",
    rating: 4.8,
    area: "City Centre",
    address: "Victoria Avenue",
    phone: "+265 1 623 456",
    hours: "5AM-10PM",
    services: ["Cardio Equipment", "Weight Training", "Group Classes", "Personal Training"],
    featured: true,
  },
  {
    id: 2,
    name: "Power Fitness Center",
    rating: 4.7,
    area: "Chichiri",
    address: "Masauko Chipembere Highway",
    phone: "+265 1 623 678",
    hours: "6AM-9PM",
    services: ["Modern Equipment", "CrossFit", "Yoga", "Nutrition Guidance"],
    featured: true,
  },
  {
    id: 3,
    name: "Elite Gym Limbe",
    rating: 4.6,
    area: "Limbe",
    address: "Limbe Market Area",
    phone: "+265 1 643 789",
    hours: "5AM-10PM",
    services: ["Strength Training", "Cardio", "Boxing", "Zumba"],
    featured: false,
  },
  {
    id: 4,
    name: "Active Life Fitness",
    rating: 4.5,
    area: "Mandala",
    address: "Mandala Road",
    phone: "+265 1 661 234",
    hours: "6AM-8PM",
    services: ["Gym Equipment", "Personal Training", "Pilates"],
    featured: false,
  },
  {
    id: 5,
    name: "Body Builder Gym",
    rating: 4.4,
    area: "Ndirande",
    address: "Ndirande Main Road",
    phone: "+265 1 681 567",
    hours: "5AM-9PM",
    services: ["Weight Lifting", "Cardio", "Muscle Building Programs"],
    featured: false,
  },
  {
    id: 6,
    name: "Wellness Fitness Hub",
    rating: 4.7,
    area: "Chichiri",
    address: "Chichiri Shopping Mall",
    phone: "+265 1 672 890",
    hours: "6AM-10PM",
    services: ["Cardio", "Weights", "Spinning", "Sauna"],
    featured: false,
  },
]

export default function GymPage() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const observeCards = () => {
      const cards = document.querySelectorAll('.service-card')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-index') || '0')
              setVisibleCards((prev) => [...new Set([...prev, index])])
            }
          })
        },
        { threshold: 0.1 }
      )

      cards.forEach((card) => observer.observe(card))
      return () => observer.disconnect()
    }

    window.addEventListener('scroll', handleScroll)
    const cleanup = observeCards()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cleanup()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Health Hub MW Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blantyre Health Hub</h1>
              <p className="text-xs text-gray-600">Your Complete Health Directory</p>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section 
        className="relative py-32 px-4 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: 'url(/gym-bg.jpeg)',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/80 via-red-800/70 to-orange-900/80"></div>
        <div 
          className="container mx-auto text-center relative z-10 transition-all duration-500"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY / 400)
          }}
        >
          <Badge variant="secondary" className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-lg px-6 py-2">
            <Dumbbell className="h-5 w-5 mr-2 inline" />
            Gyms & Fitness Centers
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Transform Your Body
            <span className="text-orange-300 block mt-2">Achieve Your Goals</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Modern fitness facilities across Blantyre offering cardio, strength training, group classes, and personal training services
          </p>
        </div>
      </section>

      {/* Gyms List */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Gyms & Fitness Centers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional fitness facilities with modern equipment and expert trainers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gyms.map((gym, index) => (
              <Card
                key={gym.id}
                data-index={index}
                className={`service-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <CardHeader className={gym.featured ? "bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg" : ""}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className={`text-xl ${gym.featured ? 'text-white' : 'text-gray-900'}`}>
                        {gym.name}
                      </CardTitle>
                      <Badge variant="secondary" className={`mt-2 ${gym.featured ? 'bg-white/20 text-white' : ''}`}>
                        {gym.area}
                      </Badge>
                    </div>
                    <div className={`flex items-center ${gym.featured ? 'bg-white/20' : 'bg-yellow-50'} px-2 py-1 rounded-full`}>
                      <Star className={`h-4 w-4 ${gym.featured ? 'text-yellow-300' : 'text-yellow-400'} fill-current`} />
                      <span className={`text-sm font-medium ml-1 ${gym.featured ? 'text-white' : 'text-gray-900'}`}>
                        {gym.rating}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-orange-600" />
                      <span className="text-sm">{gym.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-orange-600" />
                      <span className="text-sm">{gym.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-orange-600" />
                      <span className="text-sm font-medium">{gym.hours}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {gym.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href={`/provider/${gym.id}`}>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-300 group">
                      View Details
                      <Search className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Start Your Fitness Journey Today!</h3>
              <p className="text-xl mb-6 text-white/90">
                Join a gym near you and get access to modern equipment, expert trainers, and group classes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                  Find a Gym Near You
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2025 Blantyre Health Hub. All rights reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
