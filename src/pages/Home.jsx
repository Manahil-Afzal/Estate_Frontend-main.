import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import dubaiListings from '../components/dubaiListings';
import ListingItem from '../components/ListingItem';
import { API_BASE_URL } from "../config";

export default function Home() {
  const [apiListings, setApiListings] = useState([]);
  const navigate = useNavigate();
  const API_BASE_URL = "https://estate-backend-main.vercel.app/api";
  const images = ['/1.jpg','/2.jpg','/3.jpg','/4.jpg','/5.jpg','/6.jpg','/7.jpg','/8.jpg'];
  
useEffect(() => {
  const fetchListings = async () => {
    try {
    const res = await fetch(`${API_BASE_URL}/listing`); 
      const data = await res.json();
      setApiListings(data);  
    } catch (err) {
      console.error('Failed to fetch listings:', err);
    }
  };
  fetchListings();
}, []);


  const allListings = [...dubaiListings, ...apiListings];

  const offers = allListings.filter(listing => listing.offer);
  const rentals = allListings.filter(listing => listing.type === 'rent');
  const sales = allListings.filter(listing => listing.type === 'sale');

  const firstN = (listings, n) => listings.slice(0, n);

  const handleCardClick = (id) => {
    navigate(`/listing/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-10">

      <div className="flex flex-col gap-4 text-left">
        <h1 className="text-6xl lg:text-7xl font-bold text-slate-700 leading-snug">
          Find your next perfect {" "}
          
          <br />
          place with ease
        </h1>
        <p className="text-lg lg:text-xl text-gray-500">
          Sahand Estate is the best place to find your next perfect place to live.<br />
          We have a wide range of properties for you to choose from.
        </p>
        <button
          onClick={() => navigate('/search')}
          className="mt-7 px-3 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400 w-40"
        >
          Let's get started...
        </button>
      </div>
    
      {offers.length > 0 && (
        <section>
          <div className="flex flex-col items-start gap-1 mb-4">
            <h2 className="text-2xl font-semibold text-slate-700">Recent Offers</h2>
            <Link to="/search?offer=true" className="text-blue-600 hover:underline text-sm">
              Show more offers
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstN(offers, 12).map(listing => (
              <div
                key={listing._id || listing.id}
                onClick={() => handleCardClick(listing._id || listing.id)}
                className="cursor-pointer"
              >
                <ListingItem listing={listing} cardHeight="h-80" />
              </div>
            ))}
          </div>
        </section>
      )}

      {rentals.length > 0 && (
        <section>
          <div className="flex flex-col items-start gap-1 mb-4">
            <h2 className="text-2xl font-semibold text-slate-700">Places for Rent</h2>
            <Link to="/search?type=rent" className="text-blue-600 hover:underline text-sm">
              Show more places for rent
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstN(rentals, 12).map(listing => (
              <div
                key={listing._id || listing.id}
                onClick={() => handleCardClick(listing._id || listing.id)}
                className="cursor-pointer"
              >
                <ListingItem listing={listing} cardHeight="h-80" />
              </div>
            ))}
          </div>
        </section>
      )}

      {sales.length > 0 && (
        <section>
          <div className="flex flex-col items-start gap-1 mb-4">
            <h2 className="text-2xl font-semibold text-slate-700">Places for Sale</h2>
            <Link to="/search?type=sale" className="text-blue-600 hover:underline text-sm">
              Show more places for sale
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstN(sales, 12).map(listing => (
              <div
                key={listing._id || listing.id}
                onClick={() => handleCardClick(listing._id || listing.id)}
                className="cursor-pointer"
              >
                <ListingItem listing={listing} cardHeight="h-80" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
