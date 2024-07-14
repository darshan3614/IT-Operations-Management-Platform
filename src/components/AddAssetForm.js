// src/components/AddAssetForm.js
import React, { useState } from 'react';
import { addAsset } from '../apiService';

const AddAssetForm = () => {
  const [asset, setAsset] = useState({
    name: '',
    type: '',
    status: '',
    purchase_date: '',
    lifecycle_stage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset({
      ...asset,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAsset = await addAsset(asset);
      console.log('Asset added:', newAsset);
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={asset.name} onChange={handleChange} placeholder="Name" />
      <input name="type" value={asset.type} onChange={handleChange} placeholder="Type" />
      <input name="status" value={asset.status} onChange={handleChange} placeholder="Status" />
      <input name="purchase_date" value={asset.purchase_date} onChange={handleChange} placeholder="Purchase Date" />
      <input name="lifecycle_stage" value={asset.lifecycle_stage} onChange={handleChange} placeholder="Lifecycle Stage" />
      <button type="submit">Add Asset</button>
    </form>
  );
};

export default AddAssetForm;
