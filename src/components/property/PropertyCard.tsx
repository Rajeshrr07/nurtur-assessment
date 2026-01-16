"use client";

import type React from "react";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Property } from "../../types/property";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const data = property.attributes;

  return (
    <div onClick={() => onSelect(property)} className="group cursor-pointer ">
      {/* IMAGE CONTAINER */}
      <div className="relative overflow-hidden aspect-[6/3] mb-5">
        <img
          src={data.images[0]?.url || "https://placehold.co/400"}
          alt={data.title}
          className="w-full h-full object-cover"
        />

        {/* CENTER WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-13 h-13 border-2 border-white/50 rounded-full flex items-center justify-center ">
            <span className="text-white/70 font-serif text-4xl font-medium">
              cc
            </span>
          </div>
        </div>

        {/* FAVORITE BUTTON */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/40 transition-colors cursor-pointer"
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            className={
              isFavorited ? "fill-red-500 text-red-500" : "text-white/90"
            }
          />
        </button>
      </div>

      {/* CONTENT CONTAINER - Centered design matching search results */}
      <div className="flex flex-col items-center space-y-1.5 text-center px-2">
        <h3 className="text-[13px] font-medium text-gray-500 uppercase tracking-[0.05em]">
          {data.title}
        </h3>
        <p className="text-[13px] text-gray-400 font-light">
          {data.bedrooms} bedroom apartment for sale
        </p>
        <p className="text-base font-bold text-[#1a1a1a] pt-1.5">
          {data.price ? `${data.price.toLocaleString()} €` : "Price on request"}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
