import { Link } from 'react-router-dom';

const CampusCard = ({ campus }) => {
  return (
    <Link to={`/campuses/${campus._id}`}>
      <div className='h-full max-w-sm p-6 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow'>
        <div>
          <h5 className='mb-2 text-xl font-semibold tracking-tight text-gray-900'>
            {campus.name}
          </h5>
          <p className='text-gray-700 text-base mb-4'>{campus.location}</p>
        </div>
        <div className='flex justify-start'></div>
      </div>
    </Link>
  );
};
export default CampusCard;
