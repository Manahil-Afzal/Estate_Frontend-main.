import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { API_BASE_URL } from "../config";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-80">
      <img
        src={listing.imageUrls[0]}
        alt={listing.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-slate-700">{listing.name}</h3>
        <h4 className="text-sm text-gray-500">{listing.location}</h4>
        <p className="text-gray-600 text-sm">{listing.description}</p>
        <p className="font-semibold text-blue-800">{listing.price}</p>
        <p className="text-gray-500 text-sm">{listing.beds} beds • {listing.baths} baths</p>
      </div>
    </div>
  );
}



