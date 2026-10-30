

// src/services/ai.service.js
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_KEY });

// ---------- Schema ----------
const questionSchema = z.object({
  question: z.string().describe("The interview question"),
  intention: z.string().describe("The intention of the interviewer behind asking this question"),
  answer: z.string().describe("How to answer: key points to cover and the approach to take"),
});

export const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe("Score from 0 to 100 showing how well the candidate matches the job description"),
  technicalQuestions: z.array(questionSchema).describe("Technical questions with intention and how to answer"),
  behavioralQuestions: z.array(questionSchema).describe("Behavioral questions with intention and how to answer"),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("Skill the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("How important this gap is for the job"),
      })
    )
    .describe("Skill gaps with severity"),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("Day number, starting from 1"),
        focus: z.string().describe("Main focus of the day, e.g. system design, DSA, mock interview"),
        tasks: z.array(z.string()).describe("Tasks to do on this day"),
      })
    )
    .describe("Day wise preparation plan"),
    title:z.string().describe("The title of the job for which the interview report is generated")
});


const jsonSchema = z.toJSONSchema(interviewReportSchema, { target: "draft-7" });
delete jsonSchema.$schema; // Gemini ko ye key nahi chahiye

// // Debug: ek baar check karo ki schema khali nahi hai, phir ye line hata dena
// console.log("Schema keys:", Object.keys(jsonSchema.properties || {}));

// ---------- Retry + fallback ----------
const MODELS = ["gemini-3.8-flash", "gemini-2.5-flash"]; // pehla busy ho to doosra
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callGemini(prompt) {
  let lastError;

  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseJsonSchema: jsonSchema,
          },
        });
      } catch (err) {
        lastError = err;
        if (err.status !== 503 && err.status !== 429) throw err;
        console.log(`${model} busy, attempt ${attempt}/3`);
        await sleep(attempt * 2000);
      }
    }
  }
  throw lastError;
}

// ---------- Main function ----------
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  const prompt = `You are an expert technical recruiter and interview coach.
Generate an interview report for the candidate below.

Rules:
-- title: short job title taken from the job description, e.g. "Full Stack Developer".
- matchScore: integer 0 to 100.
- technicalQuestions: 5 objects, each with "question", "intention", "answer".
- behavioralQuestions: 3 objects, each with "question", "intention", "answer".
- skillGaps: array of objects with "skill" and "severity" (low | medium | high). Always include this.
- preparationPlan: 7 objects, each with "day" (number), "focus" (string), "tasks" (array of strings).
- Never return plain strings inside these arrays. Always return objects.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

  const response = await callGemini(prompt);

  const parsed = JSON.parse(response.text);
  return interviewReportSchema.parse(parsed); // galat structure pe yahin error aayega
}

export default generateInterviewReport;







