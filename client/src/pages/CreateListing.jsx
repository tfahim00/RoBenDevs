import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === 'radio') {
      setFormData({
        ...formData,
        condition: value, // Update the condition based on radio button value
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [id]: checked, // Update the state based on checkbox checked status
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          category: formData.category.toLowerCase(), // Ensure category is sent in lowercase
        }),
      });
      const data = await res.json();
      setLoading(false);/*
      if (data.success === false) {
        setError(data.message);
      } else {
        // If listing creation is successful, add the new listing to the home page
        addNewListing(data); // Assuming data is the newly created listing object
        navigate(`/listing/${data._id}`);
      }*/
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Product Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Product Details'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          
          <div className='flex gap-6'>
            <select
              id='category'
              className='p-3 border border-gray-300 rounded-lg'
              onChange={handleChange}
              value={formData.category}
              required
            >
              <option value='' disabled>
                Select a category
              </option>
              <option value='bangla'>Bangla</option>
              <option value='chinese'>Chinese</option>
              <option value='korean'>Korean</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
