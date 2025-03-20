/**
 * API Service for NutriGuard
 * Handles all backend communication with FastAPI server
 */

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Types for API requests and responses
export interface MeasurementData {
  childName: string;
  sex: number;
  age: number;
  height: number;
  weight: number;
  height_for_age_z: number;
  weight_for_height_z: number;
  weight_for_age_z: number;
  WHR: number;
  photoUrl?: string;
}

export interface ChildProfileData {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
  lastMeasurement: string;
  status: "normal" | "warning" | "danger";
  image?: string;
  measurements: MeasurementHistory[];
}

export interface MeasurementHistory {
  date: string;
  age: number;
  weight: number;
  height: number;
  weightForAge: number;
  heightForAge: number;
  weightForHeight: number;
}

export enum MalnutritionClassification {
  Low = "low",
  Moderate = "moderate",
  High = "high",
  Critical = "critical",
}

// Centralized API request handler
const fetchApi = async (endpoint: string, options: RequestInit) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};

/**
 * API Service for NutriGuard
 */
export const api = {
  submitMeasurement: (data: MeasurementData) =>
    fetchApi("/children", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  getAllChildren: () =>
    fetchApi("/children", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  getChildById: (childId: string) =>
    fetchApi(`/children/${childId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  addMeasurementForChild: (childId: string, data: MeasurementData) =>
    fetchApi(`/children/${childId}/measurements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  analyzeMeasurements: (data: MeasurementData) =>
    fetchApi("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};

export default api;