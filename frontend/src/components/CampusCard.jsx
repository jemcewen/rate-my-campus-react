const CampusCard = ({ campus }) => {
  return (
    <div className='h-48 max-w-sm p-6 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow'>
      <div>
        <h5 className='mb-2 text-xl font-semibold tracking-tight text-gray-900'>
          {campus.name}
        </h5>
        <p className='text-gray-700 text-base mb-4'>{campus.location}</p>
      </div>
      <div className='flex justify-start'>
        <button
          type='button'
          className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        >
          View Campus
        </button>
      </div>
    </div>
  );
};
export default CampusCard;
