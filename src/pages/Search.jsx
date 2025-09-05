import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import dubaiListings from '../components/dubaiListings';
import { API_BASE_URL } from "../config";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm') || '';
  const typeFromUrl = urlParams.get('type') || 'all';
  const parkingFromUrl = urlParams.get('parking') === 'true';
  const furnishedFromUrl = urlParams.get('furnished') === 'true';
  const offerFromUrl = urlParams.get('offer') === 'true';

  setSidebardata({
    searchTerm: searchTermFromUrl,
    type: typeFromUrl,
    parking: parkingFromUrl,
    furnished: furnishedFromUrl,
    offer: offerFromUrl,
    sort: urlParams.get('sort') || 'created_at',
    order: urlParams.get('order') || 'desc',
  });

  const fetchListings = () => {
    setLoading(true);
    let results = dubaiListings;
    if (searchTermFromUrl) {
      results = results.filter(listing =>
        listing.name.toLowerCase().includes(searchTermFromUrl.toLowerCase())
      );
    }
    if (typeFromUrl !== 'all') {
      results = results.filter(listing => listing.type === typeFromUrl);
    }
    if (offerFromUrl) {
      results = results.filter(listing => listing.offer);
    }

  
    setListings(results);
    setShowMore(false); 
    setLoading(false);
  };

  fetchListings();
}, [location.search]);


  const handleChange = (e) => {
    if (['all', 'rent', 'sale'].includes(e.target.id)) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (['parking', 'furnished', 'offer'].includes(e.target.id)) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }
    if (e.target.id === 'sort_order') {
      const [sort, order] = e.target.value.split('_');
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            {['all', 'rent', 'sale'].map((type) => (
              <div key={type} className="flex gap-2">
                <input
                  type="checkbox"
                  id={type}
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === type}
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

<div className="p-7 flex flex-wrap gap-4">
  {loading && (
    <p className="text-xl text-slate-700 text-center w-full">
      Searching...
    </p>
  )}
  {!loading && listings.length === 0 && (
    <p className="text-xl text-slate-700">No listing found!</p>
  )}
  {!loading &&
  listings.map((listing) => (
    <div
      key={listing.id || listing._id}
      onClick={() => navigate(`/listing/${listing._id || listing.id}`)}
      className="cursor-pointer w-full sm:w-80"
    >
      <ListingItem listing={listing} />
    </div>
  ))}

  {!loading && showMore && (
    <button
      onClick={() => {
        setListings((prev) => [
          ...prev,
          ...dubaiListings.slice(prev.length, prev.length + 8),
        ]);
        if (listings.length + 8 >= dubaiListings.length) {
          setShowMore(false);
        }
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
    >
      Show More
    </button>
  )}
</div>
      </div>
  );
}
