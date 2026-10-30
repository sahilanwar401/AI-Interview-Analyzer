import express from "express"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from  "cors"
import interviewRouter from "./routes/interview.routes.js";
const app = express();
app.set("trust proxy", 1);
app.use(cookieParser())
app.use(express.json()  )
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ai-interview-analyzer-jade.vercel.app"
    ],
    credentials: true
}))
/**using authentication related routes here      */
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter) 



export default app;
