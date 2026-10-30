import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../auth.context";
import { logout } from "../services/auth.api";
import { toast } from "react-toastify";
/* ------------------------------------------------------------------
   Apni details yahan badlo
------------------------------------------------------------------ */
const BRAND = "InterviewAI";
const CREATOR = "Md Sahil Anwar";
const CREATOR_LINK = "https://github.com/your-username";

/* ---------- Sample data (sirf dikhane ke liye) ---------- */
const PREVIEW_TABS = [
  { key: "questions", label: "Questions" },
  { key: "gaps", label: "Skill gaps" },
  { key: "plan", label: "Roadmap" },
];

const SAMPLE_QUESTIONS = [
  "How do you secure JWT tokens in a MERN app?",
  "How does Node.js handle async work on a single thread?",
  "When would you embed documents instead of referencing them?",
];

const SAMPLE_GAPS = [
  { skill: "Docker and CI/CD", level: "high" },
  { skill: "Testing with Jest and Supertest", level: "medium" },
  { skill: "Cloud deployment", level: "medium" },
  { skill: "Redis and message queues", level: "low" },
];

const SAMPLE_PLAN = [
  { day: 1, focus: "JavaScript and async basics" },
  { day: 2, focus: "React architecture" },
  { day: 3, focus: "Node.js and Express" },
  { day: 4, focus: "MongoDB optimization" },
];

const GAP_STYLE = {
  high: "border-red-500/40 bg-red-500/10 text-red-400",
  medium: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  low: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
};

const FAQS = [
  {
    q: "What do I need to get started?",
    a: "A PDF resume or a short description of your experience, and the job description of the role you are applying for.",
  },
  {
    q: "How long does a report take?",
    a: "About 30 seconds. When the AI service is busy it can take a little longer.",
  },
  {
    q: "Can I see my old reports?",
    a: "Yes. Every report is saved to your account, and you can open any of them again from the home page.",
  },
  {
    q: "Is my resume shared with anyone?",
    a: "Your resume is only used to build your report. It is stored in your account and is not shown to other users.",
  },
];

/* ---------- Interactive preview card ---------- */
const ReportPreview = () => {
  const [tab, setTab] = useState("questions");
 

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - 0.82 * circumference;

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#2b2b31] bg-[#1a1a1d] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#2b2b31] pb-4">
        <div>
          <p className="text-xs text-[#9a9aa6]">Your report for</p>
          <p className="mt-0.5 text-base font-semibold">Full Stack Developer</p>
        </div>
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="40" cy="40" r={radius} fill="none" stroke="#2b2b31" strokeWidth="6" />
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="#22c55e"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">82</span>
        </div>
      </div>

      <div className="mt-4 flex gap-1 rounded-lg bg-[#121214] p-1">
        {PREVIEW_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`flex-1 cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium transition ${
              tab === t.key ? "bg-[#ff2d6f] text-white" : "text-[#9a9aa6] hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 min-h-44">
        {tab === "questions" && (
          <div className="space-y-2">
            {SAMPLE_QUESTIONS.map((q, i) => (
              <div key={q} className="flex items-start gap-3 rounded-lg border border-[#2b2b31] bg-[#121214] px-3 py-2.5">
                <span className="mt-0.5 rounded bg-[#ff2d6f]/15 px-1.5 py-0.5 text-[11px] font-semibold text-[#ff2d6f]">
                  Q{i + 1}
                </span>
                <span className="text-sm">{q}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "gaps" && (
          <div className="flex flex-wrap gap-2">
            {SAMPLE_GAPS.map((g) => (
              <span key={g.skill} className={`rounded-md border px-2.5 py-1.5 text-xs font-medium ${GAP_STYLE[g.level]}`}>
                {g.skill}
              </span>
            ))}
          </div>
        )}

        {tab === "plan" && (
          <ol className="space-y-2.5 border-l border-[#2b2b31] pl-5">
            {SAMPLE_PLAN.map((p) => (
              <li key={p.day} className="relative text-sm">
                <span className="absolute -left-6.75 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff2d6f] text-[10px] font-bold text-white">
                  {p.day}
                </span>
                {p.focus}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

const Landing = () => {
  
   const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;
    const handleClick = async()=>{
      try {
        await logout()
         toast.success("Logged out successfully");

        // setUser(null)
        
      } catch (error) {
        console.log(error);
        
        
      }
    }
  return (
    <main className="min-h-screen bg-[#121214] text-[#ececf0]">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-20 border-b border-[#2b2b31]/60 bg-[#121214]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/landing" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff2d6f] text-sm text-white">
              {BRAND.charAt(0)}
            </span>
            {BRAND}
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[#9a9aa6] md:flex">
            <a href="#how" className="transition hover:text-white">How it works</a>
            <a href="#report" className="transition hover:text-white">What you get</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>

          { user ? <Link onClick={handleClick} to="/" className="text-sm text-[#9a9aa6] transition hover:text-white">
              Logout
            </Link>:<div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-[#9a9aa6] transition hover:text-white">
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-[10px] bg-[#ff2d6f] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2d6f]"
            >
              Sign up
            </Link>
          </div>}
        </div>
      </header>

      {/* ================= HERO ================= */}
      
     
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 h-120 w-120 rounded-full bg-[#ff2d6f]/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Know what they will ask before you walk in
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#9a9aa6]">
              Add your resume and the job description. Get the questions you are likely to face,
              the skills you are missing, and a day-by-day plan for your preparation.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="rounded-[10px] bg-[#ff2d6f] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2d6f]"
              >
                Create my interview plan
              </Link>
              <Link
                to="/login"
                className="text-sm text-[#9a9aa6] underline-offset-4 transition hover:text-white hover:underline"
              >
                I already have an account
              </Link>
            </div>

            <ul className="mt-8 space-y-2 text-sm text-[#9a9aa6]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff2d6f]" /> Works with a PDF resume
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff2d6f]" /> Report ready in about 30 seconds
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff2d6f]" /> Every report is saved to your account
              </li>
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ReportPreview />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="border-t border-[#2b2b31]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="max-w-md text-2xl font-bold tracking-tight sm:text-3xl">
            From job post to a plan in three steps
          </h2>

          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              { t: "Add your details", d: "Upload your resume as a PDF and paste the job description. No resume handy? A short description of yourself works too." },
              { t: "Get your report", d: "The AI compares your profile with the job and builds questions, skill gaps and a match score." },
              { t: "Follow the plan", d: "Work through a 7-day roadmap. Each day has one focus and a few clear tasks." },
            ].map((s, i) => (
              <li key={s.t} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff2d6f] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  {i < 2 && <span aria-hidden="true" className="hidden h-px flex-1 bg-[#2b2b31] md:block" />}
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9a9aa6]">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= WHAT YOU GET ================= */}
      <section id="report" className="border-t border-[#2b2b31]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="max-w-lg text-2xl font-bold tracking-tight sm:text-3xl">
            Not just a list of questions
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#9a9aa6]">
            Each part of the report is written for the role you are applying to, so you spend your time on what will actually be asked.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            <div className="rounded-2xl border border-[#2b2b31] bg-[#1a1a1d] p-6 lg:col-span-3">
              <h3 className="text-base font-semibold">Questions with answers to aim for</h3>
              <p className="mt-1.5 text-sm text-[#9a9aa6]">
                You see why the interviewer is asking, and what a strong answer covers.
              </p>

              <div className="mt-5 rounded-lg border border-[#2b2b31] bg-[#121214]">
                <div className="flex items-start gap-3 px-4 py-3">
                  <span className="mt-0.5 rounded bg-[#ff2d6f]/15 px-1.5 py-0.5 text-[11px] font-semibold text-[#ff2d6f]">Q1</span>
                  <span className="text-sm">How do you secure JWT tokens in a MERN app?</span>
                </div>
                <div className="space-y-3 border-t border-[#2b2b31] px-4 py-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-[#ff2d6f]">What the interviewer wants</p>
                    <p className="mt-1 text-[#9a9aa6]">To check that you understand secure login flows and token handling.</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-400">How to answer</p>
                    <p className="mt-1 text-[#9a9aa6]">
                      Sign tokens on login, verify them in middleware, and keep them in HttpOnly cookies instead of localStorage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#2b2b31] bg-[#1a1a1d] p-6 lg:col-span-2">
              <h3 className="text-base font-semibold">Skill gaps, ranked</h3>
              <p className="mt-1.5 text-sm text-[#9a9aa6]">Red means fix first. Green means nice to have.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SAMPLE_GAPS.map((g) => (
                  <span key={g.skill} className={`rounded-md border px-2.5 py-1.5 text-xs font-medium ${GAP_STYLE[g.level]}`}>
                    {g.skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#2b2b31] bg-[#1a1a1d] p-6 lg:col-span-5">
              <h3 className="text-base font-semibold">A 7-day roadmap</h3>
              <p className="mt-1.5 text-sm text-[#9a9aa6]">One focus per day, with tasks you can finish.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SAMPLE_PLAN.map((p) => (
                  <div key={p.day} className="rounded-lg border border-[#2b2b31] bg-[#121214] p-4">
                    <p className="text-xs font-semibold text-[#ff2d6f]">Day {p.day}</p>
                    <p className="mt-1.5 text-sm">{p.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="border-t border-[#2b2b31]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Questions you may have</h2>
          <div className="divide-y divide-[#2b2b31] border-y border-[#2b2b31]">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                  {f.q}
                  <span className="text-lg text-[#9a9aa6] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#9a9aa6]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="border-t border-[#2b2b31]">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your next interview is closer than you think
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-[#9a9aa6]">
            Make a plan today, so your preparation time goes to the right things.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-block rounded-[10px] bg-[#ff2d6f] px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2d6f]"
          >
            Create my interview plan
          </Link>
        </div>
      </section>

     
    </main>
  );
};

export default Landing;