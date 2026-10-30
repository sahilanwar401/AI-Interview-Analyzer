
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api";
import { InterviewContext } from "../Interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();   // route ka param naam yahi hona chahiye

  if (!context) {
    throw new Error("useInterview must be used within Interview provider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (id) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(id);
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // URL mein id hai to wo report lao, warna saari reports
  useEffect(() => {
    if (interviewId) {
      if (report?._id !== interviewId) getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return { loading, report, reports, generateReport, getReportById, getReports };
};