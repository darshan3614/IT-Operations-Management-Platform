// AssetList.js

import React, { useEffect, useState } from 'react';
import { getAssets } from '../apiService';

const AssetList = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div>
      <h2>Asset List</h2>
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>
            {asset.name} - {asset.type} - {asset.status}
            {/* Additional details or actions */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;
