/**
 * API Service for NutriGuard
 * Handles all backend communication with FastAPI server
 */

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
console.log("✅ API Base URL:", API_BASE_URL);

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to Register User");
    }
    return await response.json();
  } catch (error) {
    console.error("❌ [Register User Error]:", error);
    throw error;
  }
};

// Types for API requests and responses

// Enums
export enum Gender {
  Male = "male",
  Female = "female"
}

export enum MalnutritionClassification {
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
  Critical = "Critical",
}

// Interfaces
export interface MeasurementData {
  id: number;
  name: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
  height_for_age_z: number;
  weight_for_height_z: number;
  weight_for_age_z: number;
  whr: number;
  photo_data: File;
}

export interface ChildProfileData {
  id: string;
  name: string;
  age: Gender;
  gender: "male" | "female";
  weight: number;
  height: number;
  lastMeasurement: string;
  status: "normal" | "warning" | "danger";
  photo_data?: string;
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

export interface ChildHealthRecord {
  id: number;
  name: string;
  sex: Gender;
  age: number;
  height: number;
  weight: number;
  height_for_age_z: number;
  weight_for_height_z: number;
  weight_for_age_z: number;
  height_m: number;
  bmi: number;
  whr: number;
  photo_data?: string;
  created_at: string;
  predicted_class: MalnutritionClassification;
  confidence: number;
  class_probabilities: Record<MalnutritionClassification, number>
}

export interface ChildPrediction {
  id: number;
  child_name: string;
  sex: "male" | "female";
  age: number;
  height: number;
  weight: number;
  date: string;
  bmi: number;
  weightForAge: number;
  heightForAge: number;
  weightForHeight: number;
  predicted_class: MalnutritionClassification;
  timestamp: string;
  photo_data?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Transform backend data to match frontend needs
const transformChildData = (record: ChildHealthRecord): ChildPrediction => ({
  id: record.id,
  child_name: record.name,
  sex: record.sex.toLowerCase() as "male" | "female",
  age: record.age,
  height: record.height,
  weight: record.weight,
  date: record.created_at,
  weightForAge: record.weight_for_age_z,
  heightForAge: record.height_for_age_z,
  weightForHeight: record.weight_for_height_z,
  bmi: record.bmi,
  predicted_class: record.predicted_class,
  timestamp: record.created_at,
  photo_data: record.photo_data ? record.photo_data.replace(/^data:image\/\w+;base64,/, '') : undefined
});

// Helper function to convert string to Gender enum
export const stringToGender = (value: string): Gender => {
  const lowercaseValue = value.toLowerCase();
  if (lowercaseValue === Gender.Male || lowercaseValue === Gender.Female) {
    return lowercaseValue as Gender;
  }
  throw new Error(`Invalid gender value: ${value}`);
};

// Centralized API request handler
const fetchApi = async (endpoint: string, options: RequestInit) => {
  try {
    console.log(`📡 [FETCH]: ${API_BASE_URL}${endpoint}`, options);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    // Check if response is OK before proceeding
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({}));
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorDetails)}`
      );
    }

    const json = await response.json();
    console.log("✅ [RESPONSE]:", json);
    return json;
  } catch (error) {
    console.error("❌ [API Error]:", error);
    throw error;
  }
};

// Add the getAllChildren function
export const getAllChildren = async (): Promise<ChildHealthRecord[]> => {
  return fetchApi("/children", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

// Add a new function to get child image
export const getChildImage = async (childId: string): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/image/${childId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }
  return await response.blob();
};

/**
 * API Service for NutriGuard
 */
export const api = {
  submitMeasurement: (data: MeasurementData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('sex', data.sex);
    formData.append('age', data.age.toString());
    formData.append('height', data.height.toString());
    formData.append('weight', data.weight.toString());
    formData.append('height_for_age_z', data.height_for_age_z.toString());
    formData.append('weight_for_height_z', data.weight_for_height_z.toString());
    formData.append('weight_for_age_z', data.weight_for_age_z.toString());
    formData.append('whr', data.whr.toString());
    formData.append('photo_data', data.photo_data);

    return fetchApi("/predict", {
      method: "POST",
      body: formData,
    });
  },

  getAllChildren: async () => {
    const response = await fetchApi("/children", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  },

  getChildById: (childId: string) =>
    fetchApi(`/child/${childId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  addMeasurementForChild: (childId: string, data: MeasurementData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('sex', data.sex);
    formData.append('age', data.age.toString());
    formData.append('height', data.height.toString());
    formData.append('weight', data.weight.toString());
    formData.append('height_for_age_z', data.height_for_age_z.toString());
    formData.append('weight_for_height_z', data.weight_for_height_z.toString());
    formData.append('weight_for_age_z', data.weight_for_age_z.toString());
    formData.append('whr', data.whr.toString());
    formData.append('photo_data', data.photo_data);

    return fetchApi(`/children/${childId}/measurements`, {
      method: "POST",
      body: formData,
    });
  },

  analyzeMeasurements: (data: MeasurementData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('sex', data.sex);
    formData.append('age', data.age.toString());
    formData.append('height', data.height.toString());
    formData.append('weight', data.weight.toString());
    formData.append('height_for_age_z', data.height_for_age_z.toString());
    formData.append('weight_for_height_z', data.weight_for_height_z.toString());
    formData.append('weight_for_age_z', data.weight_for_age_z.toString());
    formData.append('whr', data.whr.toString());
    formData.append('photo_data', data.photo_data);

    return fetchApi("/analyze", {
      method: "POST",
      body: formData,
    });
  },

  getChildPredictions: async (childId: string): Promise<ChildPrediction[]> => {
    const response = await fetchApi(`/child/${childId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }) as ChildHealthRecord[];
    console.log("API response: ", response);
    return response.map(transformChildData);
  },

  getChildImage,

  transformChildData: (record: ChildHealthRecord): ChildPrediction => ({
    id: record.id,
    child_name: record.name,
    sex: record.sex.toLowerCase() as "male" | "female",
    age: record.age,
    height: record.height,
    weight: record.weight,
    date: record.created_at,
    weightForAge: record.weight_for_age_z,
    heightForAge: record.height_for_age_z,
    weightForHeight: record.weight_for_height_z,
    bmi: record.bmi,
    predicted_class: record.predicted_class,
    timestamp: record.created_at,
    photo_data: record.photo_data ? record.photo_data.replace(/^data:image\/\w+;base64,/, '') : undefined
  }),

};

export default api;