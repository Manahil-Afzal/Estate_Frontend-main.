import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { API_BASE_URL } from "../config";

import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';
import Contact from '../components/Contact';
import dubaiListings from '../components/dubaiListings';

export default function Listing() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const API_BASE_URL = "https://estate-backend.vercel.app/api";
  useEffect(() => {
    const foundListing = dubaiListings.find(item => item.id === parseInt(listingId));
    setListing(foundListing || null);
  }, [listingId]);

  if (!listing) {
    return (
      <p className="text-center my-7 text-2xl text-red-600">
        Listing not found
      </p>
    );
  }

  return (
    <main>
      <Swiper navigation modules={[Navigation]}>
        {listing.imageUrls?.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[550px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
        <FaShare
          className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        />
      </div>

      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
          Link copied!
        </p>
      )}

      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        <p className="text-2xl font-semibold">
          {listing.name} - {listing.price}
        </p>

        <p className="flex items-center mt-2 gap-2 text-slate-600 text-sm">
          <FaMapMarkerAlt className="text-green-700" />
          {listing.location}
        </p>

        <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
        </p>

        {listing.offer && (
          <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
            $85 OFF
          </p>
        )}

        <p className="text-slate-800">
          <span className="font-semibold text-black">Description - </span>
          {listing.description}
        </p>

        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaBed className="text-lg" />
            {listing.beds} {listing.beds > 1 ? 'beds' : 'bed'}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaBath className="text-lg" />
            {listing.baths} {listing.baths > 1 ? 'baths' : 'bath'}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaParking className="text-lg" />
            No Parking
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaChair className="text-lg" />
            Unfurnished
          </li>
        </ul>

        {/* Contact button */}
        {contact ? (
          <Contact listing={listing} />
        ) : (
          <button
            onClick={() => setContact(true)}
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-4"
          >
            Contact landlord
          </button>
        )}
      </div>
    </main>
  );
}
