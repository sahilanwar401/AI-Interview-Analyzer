import React, { useRef, useState } from 'react'
import { useInterview } from '../hooks/useInterview'
import {useNavigate} from "react-router"
import { toast } from 'react-toastify'

const Home = () => {
  const {loading,generateReport,reports} = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const[selfDescription,setSelfDescription]=useState("")
  const[generate,setGenerate]=useState(false)
  const [fileName, setFileName] = useState('')
  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async()=>{
    const resumeFile = resumeInputRef.current.files[0]
    if (!jobDescription.trim()) {
  toast.error("Please enter the Job Description");
  return;
}
if (!resumeFile) {
  toast.error("Please upload your resume");
  return;
}
if (!selfDescription.trim()) {
  toast.error("Please enter your Self-Description");
  return;
}
    setGenerate(true)
    try {
      
   const data = await generateReport({jobDescription,selfDescription,resumeFile})
    navigate(`/interview/${data._id}`)
      
    } catch (error) {
      console.log( error);
      setGenerate(false)
      
      
    }
   
  }

  return (
   <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#121214] px-4 pb-6 pt-16 text-[#ececf0] sm:px-6 sm:py-6">
       <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
  <button
    type="button"
    onClick={() => navigate("/")}
    className="cursor-pointer rounded-lg border border-[#2b2b31] px-3 py-2 text-sm text-[#9a9aa6] transition hover:border-[#8b9cff] hover:text-white"
  >
    ← Back
  </button>
</div>
      {/* Heading */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create Your Custom <span className="text-[#ff2d6f]">Interview Plan</span>
        </h1>
        <p className="mx-auto mt-1.5 max-w-md text-xs text-[#9a9aa6] sm:text-sm">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </div>

      {/* Card */}
      
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2b2b31] bg-[#1a1a1d] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="grid divide-y divide-[#2b2b31] md:grid-cols-2 md:divide-x md:divide-y-0">
          {/* Left: Job description */}
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="jobDescription" className="text-sm font-semibold">
                Target Job Description
              </label>
              <span className="rounded border border-[#ff2d6f]/30 bg-[#ff2d6f]/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#ff2d6f]">
                REQUIRED
              </span>
            </div>
            <textarea
              name="jobDescription"
              placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              id="jobDescription"
              required
              maxLength={5000}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-40 w-full flex-1 resize-none rounded-[10px] border border-[#2b2b31] bg-[#121214] px-3 py-2.5 text-sm text-[#ececf0] placeholder:text-[#5f5f6b] transition hover:border-[#3a3a42] focus:border-[#ff2d6f] focus:outline-none focus:ring-[3px] focus:ring-[#ff2d6f]/20"
            ></textarea>
            <p className="text-right text-xs text-[#5f5f6b]">{jobDescription.length} / 5000 chars</p>
          </div>

          {/* Right: Profile */}
          <div className="flex flex-col gap-3 p-4">
            <h2 className="text-sm font-semibold">Your Profile</h2>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <label htmlFor="resume" className="text-sm text-[#9a9aa6]">Upload Resume</label>
                <span className="rounded border border-[#ff2d6f]/30 bg-[#ff2d6f]/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#ff2d6f]">
                  REQUIRED
                </span>
              </div>
              <div className="relative flex flex-col items-center justify-center gap-0.5 rounded-[10px] border border-dashed border-[#3a3a42] bg-[#121214] px-4 py-4 text-center transition hover:border-[#ff2d6f]">
                <p className="break-all text-sm font-medium">
                  {fileName || 'Click to upload or drag & drop'}
                </p>
                <p className="text-xs text-[#5f5f6b]">PDF (Max 5MB)</p>
                <input
                  type="file"
                  name="resume"
                  id="resume"
                  required
                  accept=".pdf"
                  ref={resumeInputRef}
                  onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>

           

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
  <label htmlFor="selfDescription" className="text-sm text-[#9a9aa6]">
    Quick Self-Description
  </label>

  <span className="inline-flex w-fit rounded border border-[#ff2d6f]/30 bg-[#ff2d6f]/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#ff2d6f]">
    REQUIRED
  </span>
</div>

              <textarea
                name="selfDescription"
                id="selfDescription"
                required
                onChange={(e)=>setSelfDescription(e.target.value)}
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                className="h-20 w-full resize-none rounded-[10px] border border-[#2b2b31] bg-[#121214] px-3 py-2.5 text-sm text-[#ececf0] placeholder:text-[#5f5f6b] transition hover:border-[#3a3a42] focus:border-[#ff2d6f] focus:outline-none focus:ring-[3px] focus:ring-[#ff2d6f]/20"
              ></textarea>
            </div>

            
          </div>
        </div>

        {/* Footer bar */}
        <div className="flex flex-col gap-2 border-t border-[#2b2b31] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#5f5f6b]">AI-Powered Strategy Generation · Approx 30s</p>
          <button disabled={generate} onClick={handleGenerateReport} className="cursor-pointer rounded-[10px] bg-[#ff2d6f] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff2d6f]">
           {generate?"Generating...":"Generate My Interview Strategy"}
          </button>
        </div>
      </div>
      {/* Recent reports slider */}
{reports?.length > 0 && (
  <section className="mt-6 w-full max-w-4xl min-w-0">
    <h2 className="mb-3 text-sm font-semibold">My recent interview plans</h2>

    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 scrollbar-thin [scrollbar-color:#2b2b31_transparent]">
      {reports.map((report) => (
        <button
          key={report._id}
          onClick={() => navigate(`/interview/${report._id}`)}
          className="flex min-h-32 w-64 shrink-0 cursor-pointer snap-start flex-col justify-between rounded-xl border border-[#2b2b31] bg-[#1a1a1d] p-4 text-left transition hover:border-[#ff2d6f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2d6f]"
        >
          <div>
            <p className="line-clamp-2 text-sm font-semibold">
              {report.title || "Untitled position"}
            </p>
            <p className="mt-1 text-xs text-[#5f5f6b]">
              {new Date(report.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {report.matchScore != null ? (
              <span
                className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                  report.matchScore >= 80
                    ? "bg-emerald-500/10 text-emerald-400"
                    : report.matchScore >= 60
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {report.matchScore}% match
              </span>
            ) : (
              <span />
            )}
            <span className="text-xs text-[#9a9aa6]">View report →</span>
          </div>
        </button>
      ))}
    </div>
  </section>
)}
        
    

      {/* Bottom links */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-[#5f5f6b]">
        <a href="#" className="transition hover:text-[#9a9aa6]">Privacy Policy</a>
        <a href="#" className="transition hover:text-[#9a9aa6]">Terms of Service</a>
        <a href="#" className="transition hover:text-[#9a9aa6]">Help Center</a>
      </div>
    </main>
  )
}

export default Home