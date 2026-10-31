

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// export async function register({ username, email, password }) {
//   try {
//     const response = await api.post("/api/auth/register", {
//     username,
//     email,
//     password,
//   });
//   return response.data;
    
//   } catch (error) {
//     console.log(error);
    
    
//   }
// }

// export async function login({ email, password }) {
//   try {
//     const response = await api.post("/api/auth/login", { email, password }
// );
//   return response.data;
    
//   } catch (error) {
//     console.log(error);
    
    
//   }
// }

// export async function logout() {
//  try {
//      const response = await api.get("/api/auth/logout");
//   return response.data;
    
//  } catch (error) {
//     console.log(error);
    
    
//  }
// }

// export async function getME() {
//   try {
//     const response = await api.get("/api/auth/get-me");
//   return response.data;
    
//   } catch (error) {
//     console.log(error);
    
    
//   }
// }

import api from "../../../api/axios";

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    localStorage.removeItem("token");
  }
}

export async function getME() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}