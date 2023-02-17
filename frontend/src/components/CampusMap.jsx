import ReactMapGL, { Marker } from 'react-map-gl';

const CampusMap = ({ geometry }) => {
  const [lng, lat] = geometry.coordinates;
  return (
    <div className='h-[300px] sm:h-[500px] rounded-2xl overflow-hidden'>
      <ReactMapGL
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 10,
        }}
        mapStyle='mapbox://styles/mapbox/streets-v12'
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        <Marker
          longitude={lng}
          latitude={lat}
          anchor='bottom'
          color='#ff0000'
        />
      </ReactMapGL>
    </div>
  );
};
export default CampusMap;
