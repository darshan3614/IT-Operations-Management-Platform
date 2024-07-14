
import React, { useEffect, useState } from 'react';
import { getAssets, addAsset, updateAsset, deleteAsset, optimizeAssets } from '../apiService';

const AssetManagement = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    name: '',
    type: '',
    status: '',
    purchase_date: '',
    lifecycle_stage: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({
      ...newAsset,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const asset = await addAsset(newAsset);
      setAssets([...assets, asset]);
      setNewAsset({
        name: '',
        type: '',
        status: '',
        purchase_date: '',
        lifecycle_stage: ''
      });
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  const handleUpdate = async (assetId, updatedAsset) => {
    try {
      const asset = await updateAsset(assetId, updatedAsset);
      const updatedAssets = assets.map(a => (a.id === asset.id ? asset : a));
      setAssets(updatedAssets);
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  const handleDelete = async (assetId) => {
    try {
      await deleteAsset(assetId);
      const filteredAssets = assets.filter(a => a.id !== assetId);
      setAssets(filteredAssets);
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const handleOptimize = async () => {
    try {
      const { optimized_assets } = await optimizeAssets();
      setAssets(optimized_assets);
    } catch (error) {
      console.error('Error optimizing assets:', error);
    }
  };

  return (
    <div>
      <h1>Asset Management</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={newAsset.name} onChange={handleChange} placeholder="Name" />
        <input name="type" value={newAsset.type} onChange={handleChange} placeholder="Type" />
        <input name="status" value={newAsset.status} onChange={handleChange} placeholder="Status" />
        <input name="purchase_date" value={newAsset.purchase_date} onChange={handleChange} placeholder="Purchase Date" />
        <input name="lifecycle_stage" value={newAsset.lifecycle_stage} onChange={handleChange} placeholder="Lifecycle Stage" />
        <button type="submit">Add Asset</button>
      </form>
      <button onClick={handleOptimize}>Optimize Assets</button>
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>
            {asset.name} - {asset.type} - {asset.status}
            <button onClick={() => handleUpdate(asset.id, { ...asset, status: 'updated' })}>Update</button>
            <button onClick={() => handleDelete(asset.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetManagement;
