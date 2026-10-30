import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
import { success } from "zod";

async function generateInterviewReportController(req, res) {
  let parser;
  try {
    const resumeFile = req.file;
    const { selfDescription, jobDescription } = req.body;

    if (!resumeFile) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }
    if (!selfDescription || !jobDescription) {
      return res
        .status(400)
        .json({ message: "selfDescription and jobDescription are required" });
    }

    parser = new PDFParse({ data: resumeFile.buffer });
    const resumeContent = await parser.getText();
    console.log("1. PDF parsed, length:", resumeContent.text.length);

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });
    console.log("2. AI report ready");

    const interviewReport = await interviewReportModel.create({
      ...interviewReportByAi,
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });
    console.log("3. DB saved");

    return res.status(201).json({
      success:true,
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (err) {
    console.error("Report error:", err);

    if (err.status === 503 || err.status === 429) {
      return res
        .status(503)
        .json({ message: "AI service abhi busy hai, thodi der baad try karo." ,success:false});
    }
    return res
      .status(500)
      .json({success:false, message: "Report generate nahi ho payi.", error: err.message });
  } finally {
    if (parser) await parser.destroy();
  }
}
 async function getInterviewReportByIdController(req,res) {
  const {interviewId}=req.params
  const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user.id})
  if(!interviewReport){
    
    return res.status(404).json({
      message:"Interview report not found"
    })
  }
  res.status(200).json({
    message:"Interview report fetched successfully",
    interviewReport
  })
  
 }
 async function getAllInterviewReportsController(req,res) {
  const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
  res.status(200).json({
    message:"Interview report fetched successfully",
    interviewReports
  })
 }

export { generateInterviewReportController,getAllInterviewReportsController,getInterviewReportByIdController };