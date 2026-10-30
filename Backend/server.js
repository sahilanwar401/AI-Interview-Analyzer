import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
// dotenv.config({ quiet: true });
import invokeGeminiAi from "./src/services/ai.service.js";
import generateInterviewReport from "./src/services/ai.service.js";


connectDB();
// generateInterviewReport(resume,selfDescription,jobDescription)



app.listen(5000, (err) => {
  if (err) {
    console.log("server not created", err);
  }
  console.log("server is running on PORT number 5000");
});
