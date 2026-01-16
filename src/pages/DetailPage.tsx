"use client";

import type React from "react";
import { useState } from "react";
import {
  Heart,
  Share2,
  Maximize2,
  Images,
  X,
  Home,
  Minimize2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Property } from "../types/property";

interface DetailPageProps {
  property: Property;
}

const DetailPage: React.FC<DetailPageProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const bedrooms = property.attributes.bedrooms;
  const sqm = 58;
  const neighborhood = "FontVilena";
  const pricePerSqm = Math.floor(property.attributes.price / sqm);

  return (
    <div className="min-h-screen">
      {/* EXPANDED IMAGE MODAL */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-4 right-4 text-white p-2 cursor-pointer rounded transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={expandedImage || "https://placehold.co/400"}
            alt="Expanded view"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      <Header />

      {/* MAIN CONTENT */}
      <main className="md:container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* LEFT COLUMN - IMAGES */}
          <div className="lg:col-span-2 space-y-4">
            {/* MAIN IMAGE */}
            <div className="relative w-full bg-gray-200 overflow-hidden aspect-[10/5] shadow-sm">
              <img
                src={
                  property.attributes.images[0]?.url ||
                  "https://placehold.co/400"
                }
                alt={property.attributes.title}
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() =>
                  setExpandedImage(
                    property.attributes.images[0]?.url ||
                      "https://placehold.co/400"
                  )
                }
              />
              {/* CENTER WATERMARK */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-13 h-13 border-2 border-white/50 rounded-full flex items-center justify-center ">
                  <span className="text-white/70 font-serif text-4xl font-medium">
                    cc
                  </span>
                </div>
              </div>
              {/* IMAGE CONTROLS */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  className="bg-white p-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    setExpandedImage(property.attributes.images[0]?.url)
                  }
                  title="View all images"
                >
                  <Images className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  className="bg-white p-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    setExpandedImage(property.attributes.images[0]?.url)
                  }
                  title="Expand image"
                >
                  <Maximize2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* THUMBNAIL GALLERY */}
            <div className="relative grid grid-cols-3 gap-4">
              {property.attributes.images.slice(1, 4).map((item, i) => (
                <div
                  key={i}
                  className="relative w-full bg-gray-200 overflow-hidden aspect-[16/10] cursor-pointer shadow-sm"
                  onClick={() => setExpandedImage(item.url)}
                >
                  <img
                    src={item.url || "https://placehold.co/400"}
                    alt={`Property view ${i + 2}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {/* CENTER WATERMARK */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-13 h-13 border-2 border-white/50 rounded-full flex items-center justify-center ">
                      {/* Replace this span with your actual logo image if available */}
                      <span className="text-white/70 font-serif text-4xl font-medium">
                        cc
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - DETAILS */}
          <div className="p-0 space-y-5">
            {/* TOP ACTION BUTTONS */}
            <div className="flex gap-3 justify-end pt-6 px-6">
              <button className=" cursor-pointer rounded transition-colors">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className=" cursor-pointer rounded transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
                />
              </button>
            </div>

            <hr className="border-gray-200 mx-6" />

            {/* PRICE AND BASICS */}
            <div className="md:px-6">
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-xl font-bold text-gray-900">
                  €{property.attributes.price.toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="mx-1">{bedrooms} bed </span> |{" "}
                  <span className="mx-1">{sqm} sqm</span>
                </p>
              </div>
              <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                {bedrooms} bedroom apartment for sale in the {neighborhood}
              </p>
              <div className="flex items-center gap-1.5 text-sm underline cursor-pointer decoration-amber-600">
                <div className="rounded-full bg-amber-500 p-1">
                  <Home className="w-2 h-2 text-white " />
                </div>
                <a
                  href={`tel:${property.attributes.crm_negotiator_id.work_phone}`}
                  className="text-amber-600  hover:underline transition-colors"
                >
                  Please contact us
                </a>
              </div>
            </div>

            {/* CONTACT BUTTON */}
            <div className="md:px-6">
              <button className="w-full bg-black cursor-pointer text-white py-3 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors">
                CONTACT AGENT
              </button>
            </div>

            {/* FACTS & FEATURES */}
            <div className="max-w-xl mx-auto md:px-6 py-2 bg-white">
              <div className="border-b border-gray-200 pb-2 mb-6">
                <h3 className="text-gray-800 text-sm font-semibold tracking-wider">
                  FACTS & FEATURES
                </h3>
              </div>

              <div className="grid grid-cols-[190px_1fr] gap-y-4 text-[13px] mb-10">
                <span className="font-bold text-gray-900">Neighbourhood:</span>
                <span className="text-gray-500 underline underline-offset-4 decoration-gray-300">
                  {neighborhood}
                </span>

                <span className="font-bold text-gray-900">Price per sqm:</span>
                <span className="text-gray-600">
                  €{pricePerSqm?.toLocaleString()}
                </span>

                <span className="font-bold text-gray-900">Brochure:</span>
                <a
                  href={property.attributes.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500  cursor-pointer underline underline-offset-4 decoration-gray-300 hover:text-black transition-colors"
                >
                  Download Brochure
                </a>

                <span className="font-bold text-gray-900">Floor plan:</span>
                <a
                  href={property.attributes.floorplan[0]?.srcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 cursor-pointer underline underline-offset-4 decoration-gray-300 hover:text-black transition-colors"
                >
                  View Floorplan
                </a>
              </div>

              {/* Description  */}
              <div className="text-gray-600 text-[13px]">
                <p>
                  Superb and peaceful location in the port of Fontvieille
                  surrounded by the harbour and sea. 1 bedroom apartment with a
                  lovely terrace spacious bedroom and kitchen. The residence
                  includes concierge and a cellar.
                </p>
              </div>
            </div>

            {/* AGENT INFO */}
            <div className="md:px-6">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={property.attributes.crm_negotiator_id.profile_img}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-base mb-0.5">
                    {property.attributes.crm_negotiator_id.name}
                  </p>
                  <p className="text-xs text-gray-600 mb-2.5">
                    {property.attributes.crm_negotiator_id.job_title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <a
                      href={`tel:${property.attributes.crm_negotiator_id.work_phone}`}
                      className="hover:text-gray-900 hover:underline transition-colors"
                    >
                      {property.attributes.crm_negotiator_id.work_phone}
                    </a>
                    <span className="text-gray-400">|</span>
                    <a
                      href={
                        property?.attributes?.crm_negotiator_id?.email
                          ? `mailto:${property.attributes?.crm_negotiator_id?.email}`
                          : "#"
                      }
                      onClick={(e) => {
                        if (!property?.attributes?.crm_negotiator_id?.email) {
                          e.preventDefault();
                          alert("Email not available");
                        }
                      }}
                      className="hover:text-gray-900 hover:underline transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* MAP VIEW */}
            <div className="md:px-6 pb-6">
              <div
                className={`relative w-full transition-all duration-500 ease-in-out bg-gray-50 border border-gray-100 overflow-hidden shadow-sm ${
                  isMapExpanded ? "h-96" : "h-12"
                }`}
              >
                <div
                  className={`absolute  inset-0 transition-opacity duration-500 ${
                    isMapExpanded
                      ? "grayscale-0 opacity-100"
                      : "grayscale opacity-60"
                  }`}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=7.416%2C43.730%2C7.430%2C43.738&layer=mapnik"
                    style={{ border: 0 }}
                    title="Property location map"
                  />
                </div>

                {/* Expand/Collapse Button  */}
                <button
                  onClick={() => setIsMapExpanded(!isMapExpanded)}
                  className="absolute  cursor-pointer bottom-1 right-2 z-10 bg-white p-1.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                  title={isMapExpanded ? "Collapse map" : "Expand map"}
                >
                  {isMapExpanded ? (
                    <Minimize2 className="w-3.5 h-3.5 text-gray-600" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailPage;
