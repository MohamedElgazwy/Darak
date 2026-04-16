"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Mock data - سيتم استبدالها ببيانات حقيقية من API
const propertyData = {
  id: 1,
  title: "Modern Apartment in New Cairo",
  description:
    "Beautiful modern apartment with stunning views, located in the heart of New Cairo. Perfect for families and professionals. This spacious apartment features high-quality finishes, large windows with natural light, and a modern kitchen with premium appliances. The building offers 24/7 security, swimming pool, and gym facilities.",
  price: 250000,
  type: "sale",
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  location: "New Cairo, Cairo",
  address: "123 Palm Street, Fifth Settlement, New Cairo",
  verified: true,
  owner: {
    name: "Ahmed Mohamed",
    phone: "+20 123 456 7890",
    email: "ahmed@example.com",
    joined: "2023",
    properties: 5,
  },
  features: [
    "Swimming Pool",
    "Gym",
    "24/7 Security",
    "Parking",
    "Balcony",
    "Fully Furnished",
    "Air Conditioning",
    "High Speed Internet",
  ],
  images: [
    "/images/property1.jpg",
    "/images/property2.jpg",
    "/images/property3.jpg",
    "/images/property4.jpg",
  ],
};

export default function PropertyDetail({ params }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        {/* Property Images Gallery */}
        <div className="relative">
          <div className="h-96 md:h-[500px] bg-gray-200">
            <img
              src={propertyData.images[activeImage]}
              alt={propertyData.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Thumbnails */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
            {propertyData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-16 h-16 flex-shrink-0 border-2 ${
                  activeImage === index ? "border-primary-600" : "border-white"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Property Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                propertyData.type === "sale"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {propertyData.type === "sale" ? "For Sale" : "For Rent"}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:w-2/3">
              {/* Property Header */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {propertyData.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <span>📍 {propertyData.address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      ${propertyData.price.toLocaleString()}
                      {propertyData.type === "rent" && (
                        <span className="text-lg text-gray-600">/month</span>
                      )}
                    </div>
                    {propertyData.verified && (
                      <div className="flex items-center gap-1 text-sm text-green-600 justify-end">
                        ✅ Verified Owner
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="border-b border-gray-200 py-6">
                <h2 className="text-xl font-semibold mb-4">
                  Property Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">🛏️</div>
                    <div className="font-semibold">{propertyData.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">🛁</div>
                    <div className="font-semibold">
                      {propertyData.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">📏</div>
                    <div className="font-semibold">
                      {propertyData.area} sqft
                    </div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">🏢</div>
                    <div className="font-semibold">Apartment</div>
                    <div className="text-sm text-gray-600">Type</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-b border-gray-200 py-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {propertyData.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="border-b border-gray-200 py-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {propertyData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map */}
              <div className="py-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p>Interactive Map</p>
                    <p className="text-sm">{propertyData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Owner & Actions */}
            <div className="lg:w-1/3">
              <div className="sticky top-8 space-y-6">
                {/* Owner Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Property Owner</h3>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {propertyData.owner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">
                        {propertyData.owner.name}
                      </div>
                      {propertyData.verified && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          ✅ Verified
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>📅 Member since {propertyData.owner.joined}</div>
                    <div>
                      🏠 {propertyData.owner.properties} properties listed
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                    >
                      Contact Owner
                    </button>

                    <button className="w-full border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition-colors">
                      Save Property
                    </button>

                    <button className="w-full border-2 border-gray-400 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                      Share Property
                    </button>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Safety Tips
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Meet in public places</li>
                    <li>• Don&apos;t send money in advance</li>
                    <li>• Verify ownership documents</li>
                    <li>• Report suspicious activity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Contact Owner</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="I'm interested in this property..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
