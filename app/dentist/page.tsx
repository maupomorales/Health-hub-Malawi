"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Clock,
  Smile,
  Star,
  ArrowLeft,
  Search,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const dentists = [
  {
    id: 1,
    name: "Blantyre Dental Clinic",
    rating: 4.9,
    area: "City Centre",
    address: "Henderson Street",
    phone: "+265 1 621 789",
    hours: "8AM-5PM",
    services: ["General Dentistry", "Teeth Cleaning", "Orthodontics", "Emergency Care"],
    featured: true,
  },
  {
    id: 2,
    name: "Smile Dental Clinic",
    rating: 4.8,
    area: "Mandala",
    address: "Mandala Road",
    phone: "+265 1 650 456",
    hours: "8AM-6PM",
    services: ["Cosmetic Dentistry", "Root Canal", "Teeth Whitening"],
    featured: true,
  },
  {
    id: 3,
    name: "Maone Dental Practice",
    rating: 4.7,
    area: "Limbe",
    address: "Masauko Chipembere Highway",
    phone: "+265 1 640 789",
    hours: "9AM-5PM",
    services: ["General Dentistry", "Fillings", "Extractions"],
    featured: false,
  },
  {
    id: 4,
    name: "Perfect Smile Dentistry",
    rating: 4.6,
    area: "Chichiri",
    address: "Chichiri Shopping Mall",
    phone: "+265 1 670 234",
    hours: "8AM-7PM",
    services: ["Dental Implants", "Veneers", "Orthodontics"],
    featured: false,
  },
  {
    id: 5,
    name: "Ndirande Dental Clinic",
    rating: 4.5,
    area: "Ndirande",
    address: "Ndirande Market Area",
    phone: "+265 1 680 567",
    hours: "8AM-5PM",
    services: ["General Dentistry", "Emergency Care", "Pediatric Dentistry"],
    featured: false,
  },
]

export default function DentistPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
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
          backgroundImage: 'url(/dentist-bg.jpeg)',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
        <div 
          className="container mx-auto text-center relative z-10 transition-all duration-500"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY / 400)
          }}
        >
          <Badge variant="secondary" className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-lg px-6 py-2">
            <Smile className="h-5 w-5 mr-2 inline" />
            Dentists in Blantyre
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Professional Dental Care
            <span className="text-blue-300 block mt-2">For Healthy Smiles</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Expert dental services across Blantyre including general dentistry, orthodontics, cosmetic procedures, and emergency care
          </p>
        </div>
      </section>

      {/* Dentists List */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Dental Clinics</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional dentists providing comprehensive oral health care and cosmetic dentistry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dentists.map((dentist, index) => (
              <Card
                key={dentist.id}
                data-index={index}
                className={`service-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <CardHeader className={dentist.featured ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg" : ""}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className={`text-xl ${dentist.featured ? 'text-white' : 'text-gray-900'}`}>
                        {dentist.name}
                      </CardTitle>
                      <Badge variant="secondary" className={`mt-2 ${dentist.featured ? 'bg-white/20 text-white' : ''}`}>
                        {dentist.area}
                      </Badge>
                    </div>
                    <div className={`flex items-center ${dentist.featured ? 'bg-white/20' : 'bg-yellow-50'} px-2 py-1 rounded-full`}>
                      <Star className={`h-4 w-4 ${dentist.featured ? 'text-yellow-300' : 'text-yellow-400'} fill-current`} />
                      <span className={`text-sm font-medium ml-1 ${dentist.featured ? 'text-white' : 'text-gray-900'}`}>
                        {dentist.rating}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-blue-600" />
                      <span className="text-sm">{dentist.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-blue-600" />
                      <span className="text-sm">{dentist.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-blue-600" />
                      <span className="text-sm font-medium">{dentist.hours}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dentist.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href={`/provider/${dentist.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 group">
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

      {/* Emergency Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Dental Emergency?</h3>
              <p className="text-xl mb-6 text-white/90">
                Several clinics offer emergency dental services for urgent care needs
              </p>
              <Link href="/emergency">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  View Emergency Contacts
                </Button>
              </Link>
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
