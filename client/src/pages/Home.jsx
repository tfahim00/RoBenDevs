import { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [banglaListings, setBanglaListings] = useState([]);
  const [chineseListings, setChineseListings] = useState([]);
  const [koreanListings, setKoreanListings] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for bangla food
        const banglaRes = await fetch('/api/listing/get?category=bangla&limit=4');
        const banglaData = await banglaRes.json();
        console.log("Book Data:", banglaData);

        setBanglaListings(banglaData);

        // Fetch data for chinese food
        const chineseRes = await fetch('/api/listing/get?category=chinese&limit=4');
        const chineseData = await chineseRes.json();
        console.log("Chinese Data:", chineseData);

        setChineseListings(chineseData);

        // Fetch data for korean food
        const koreanRes = await fetch('/api/listing/get?category=korean&limit=4');
        const koreanData = await koreanRes.json();
        setKoreanListings(koreanData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>

      {/* Listings for bangla food */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {banglaListings && banglaListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Bangla Food
              </h2>
            </div>
            <div className='flex flex-wrap gap-4'>
              {banglaListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      

      {/* Offer Listings for chinese food */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {chineseListings && chineseListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Chinese Food
              </h2>
            </div>
            <div className='flex flex-wrap gap-4'>
              {chineseListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      

      {/* Offer Listings for korean food */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {koreanListings && koreanListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Korean Food
              </h2>
            </div>
            <div className='flex flex-wrap gap-4'>
              {koreanListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
