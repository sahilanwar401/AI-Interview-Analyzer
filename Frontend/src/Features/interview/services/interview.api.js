import axios from "axios";
import { toast } from "react-toastify";
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  try {
    const response = await api.post("/api/interview/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Report generated successfully"); // return se PEHLE
    return response.data;
  } catch (error) {
    toast.error("Something went wrong. please try after some time");
    throw error; 
  }
};

// export const generateInterviewReport = async({jobDescription,selfDescription,resumeFile})=>{
//   const formData = new FormData()
//   formData.append("jobDescription",jobDescription)
//   formData.append("selfDescription",selfDescription)
//   formData.append("resume",resumeFile)

//   const response = await api.post("/api/interview/",formData,{
//     headers:{
//       "Content-Type":"multipart/form-data"
//     }
//   })

  
// return response.data
// toast.success("Report generated successfully")

// }

export const getInterviewReportById = async(interviewId)=>{
  const response = await api.get(`/api/interview/report/${interviewId}`)
  return response.data
}
export const getAllInterviewReports = async()=>{
  const response = await api.get("/api/interview/")
  return response.data
}