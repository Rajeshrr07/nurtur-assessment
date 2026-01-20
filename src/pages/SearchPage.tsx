"use client";

import { useEffect, useState } from "react";
import PropertyCard from "../components/property/PropertyCard";
import type { Property } from "../types/property";
import { ChevronDown } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

interface Props {
  onSelect: (property: Property) => void;
}

const SearchPage: React.FC<Props> = ({ onSelect }) => {
  const navigate = useNavigate();
  const [propertiesData, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://mira-strapi-dev.q.starberry.com/api/properties/?_limit=50"
        );
        const data = await res.json();
        setProperties(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error in Fetching the Details", error);
      }
    };
    fetchData();
  }, []);

  const properties = propertiesData.filter(
    (item) => item.attributes.images[0]?.url
  );
  const handleSelectProperty = (property: Property) => {
    onSelect(property);
    navigate("/detail");
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-gray-100 ">
      <Header />

      <div className="px-5">
        <section className="text-center py-12">
          <h2 className="text-4xl font-normal ">Property for Sales</h2>
        </section>

        <section className="md:max-w-[1400px] mx-auto border-y border-gray-200 bg-white sticky top-0 z-40">
          <div className="mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1 flex items-center justify-between gap-x-6 md:gap-x-10 overflow-x-auto no-scrollbar pb-1 md:pb-0 scroll-smooth">
                {[
                  "All Bedrooms",
                  "Any Neighbourhood",
                  "Min Price",
                  "Max Price",
                  "Sort by",
                ].map((label) => (
                  <div
                    key={label}
                    className="relative flex items-center gap-2 group cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span className="text-[13px] md:text-[14px] text-gray-500 font-medium group-hover:text-black transition-colors">
                      {label}
                    </span>
                    <ChevronDown
                      size={14}
                      className="text-gray-400 group-hover:text-black shrink-0"
                    />
                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all group-hover:w-full"></div>
                  </div>
                ))}
              </div>

              <div className="shrink-0 pl-6">
                <span className="text-[12px] md:text-[13px] font-medium text-gray-400 whitespace-nowrap uppercase tracking-wider">
                  {properties.length} Results
                </span>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-[1400px] mx-auto py-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={handleSelectProperty}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
