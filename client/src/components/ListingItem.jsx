import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[250px] '>
      <Link to={`/listing/${listing._id}`}>
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>

        </div>
      </Link>
    </div>
  );
}
