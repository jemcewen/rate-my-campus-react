import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCampus } from '../features/campus/campusSlice';

const CampusForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
  });

  const { name, location, description } = formData;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCampus(formData));
    // reset form inputs here
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='name' className='text-gray-700 text-sm font-bold'>
          Campus Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Please enter the campus name'
          value={name}
          onChange={handleChange}
          className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='location' className='text-gray-700 text-sm font-bold'>
          Location
        </label>
        <input
          type='text'
          name='location'
          id='location'
          placeholder='Please enter the location'
          value={location}
          onChange={handleChange}
          className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='description'
          className='text-gray-700 text-sm font-bold'
        >
          Description
        </label>
        <textarea
          name='description'
          id='description'
          placeholder='Please enter a description of the campus'
          rows='4'
          cols='1'
          wrap='hard'
          value={description}
          onChange={handleChange}
          className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none resize-none'
        />
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default CampusForm;
