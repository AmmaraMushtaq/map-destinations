
// src/pages/index.js

import { useEffect, useState } from 'react';
import Map from '../components/Map'; // Importing the Map component
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'your-dataset', // Replace with your Sanity dataset
  useCdn: true,
  apiVersion: '2023-08-19', // Sanity API version
});

export default function Home() {
  const [data, setData] = useState([]);
  const [bounds, setBounds] = useState(null);

  const fetchData = async (bounds) => {
    if (!bounds) return;

    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const query = `*[_type == "yourDataType" &&
      geoPoint.lat >= ${sw.lat()} && geoPoint.lat <= ${ne.lat()} &&
      geoPoint.lng >= ${sw.lng()} && geoPoint.lng <= ${ne.lng()}]{
        _id, title, geoPoint
    }`;

    const result = await client.fetch(query);
    setData(result);
  };

  useEffect(() => {
    fetchData(bounds);
  }, [bounds]);

  const handleBoundsChanged = (mapBounds) => {
    setBounds(mapBounds);
  };

  return (
    <div style={styles.container}>
      <div style={styles.listContainer}>
        <h2>Items</h2>
        {data.map((item) => (
          <div key={item._id} style={styles.listItem}>
            <h3>{item.title}</h3>
            <p>
              Lat: {item.geoPoint.lat}, Lng: {item.geoPoint.lng}
            </p>
          </div>
        ))}
      </div>
      <div style={styles.mapContainer}>
        <Map onBoundsChanged={handleBoundsChanged} data={data} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  listContainer: {
    width: '30%',
    padding: '20px',
    overflowY: 'scroll',
    borderRight: '1px solid #ccc',
  },
  listItem: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  mapContainer: {
    width: '70%',
    height: '100%',
  },
};
