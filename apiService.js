// src/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getAssets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
};

export const addAsset = async (asset) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/assets`, asset);
    return response.data;
  } catch (error) {
    console.error('Error adding asset:', error);
    throw error;
  }
};

export const updateAsset = async (assetId, asset) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/assets/${assetId}`, asset);
    return response.data;
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

export const deleteAsset = async (assetId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/assets/${assetId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
};

export const optimizeAssets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assets/optimize`);
    return response.data;
  } catch (error) {
    console.error('Error optimizing assets:', error);
    throw error;
  }
};
