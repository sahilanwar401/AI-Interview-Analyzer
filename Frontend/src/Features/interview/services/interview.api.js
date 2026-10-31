// import axios from "axios";
// import { toast } from "react-toastify";
// const api = axios.create({
// baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });
// export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
//   const formData = new FormData();
//   formData.append("jobDescription", jobDescription);
//   formData.append("selfDescription", selfDescription);
//   formData.append("resume", resumeFile);

//   try {
//     const response = await api.post("/api/interview/", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     toast.success("Report generated successfully"); // return se PEHLE
//     return response.data;
//   } catch (error) {
//     toast.error("Something went wrong. please try after some time");
//     throw error; 
//   }
// };


// export const getInterviewReportById = async(interviewId)=>{
//   const response = await api.get(`/api/interview/report/${interviewId}`)
//   return response.data
// }
// export const getAllInterviewReports = async()=>{
//   const response = await api.get("/api/interview/")
//   return response.data
// }

import { toast } from "react-toastify";
import api from "../../../api/axios";

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  try {
    const response = await api.post("/api/interview/", formData, {
      timeout: 300000,
    });

    toast.success("Report generated successfully");
    return response.data;
  } catch (error) {
    toast.error("Something went wrong. Please try after some time");
    throw error;
  }
};

export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");
  return response.data;
};