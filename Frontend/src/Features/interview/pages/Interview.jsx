


import { useState } from "react";
import { FiChevronDown, FiMessageSquare, FiNavigation } from "react-icons/fi";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const severityStyle = {
  high: "border-red-500/40 bg-red-500/10 text-red-400",
  medium: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  low: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
};

const tabs = [
  { key: "technical", label: "Technical Questions", icon: HiOutlineCodeBracket },
  { key: "behavioral", label: "Behavioral Questions", icon: FiMessageSquare },
  { key: "roadmap", label: "Road Map", icon: FiNavigation },
];

// Accordion question list
const Questions = ({ list }) => {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-3">
      {list.map((q, i) => (
        <div key={i} className="rounded-lg border border-slate-700/60 bg-[#111a2b]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
          >
            <span className="mt-0.5 rounded bg-rose-500/15 px-1.5 py-0.5 text-[11px] font-semibold text-rose-400">
              Q{i + 1}
            </span>
            <span className="flex-1 text-sm text-slate-200">{q.question}</span>
            <FiChevronDown
              className={`mt-1 text-slate-400 transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>

          {open === i && (
            <div className="space-y-3 border-t border-slate-700/60 px-4 py-4 text-sm">
              <div>
                <p className="mb-1 text-xs font-semibold text-rose-400">Interviewer's intention</p>
                <p className="text-slate-300">{q.intention}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold text-emerald-400">How to answer</p>
                <p className="text-slate-300">{q.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Interview = () => {
  const [active, setActive] = useState("technical");
  const { report, loading } = useInterview();
  const navigate = useNavigate()

  // report abhi aayi nahi (refresh ke baad pehli render)
  if (loading || !report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b1220] text-slate-400">
        Loading report...
      </div>
    );
  }

  // To avoid from missing fields
  const technical = report.technicalQuestions || [];
  const behavioral = report.behavioralQuestions || [];
  const skillGaps = report.skillGaps || [];
  const plans = report.preparationPlan || report.preparationPlans || [];

  return (
    <div className=" relative min-h-screen bg-[#0b1220] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto mb-4 max-w-6xl">
  <button
    type="button"
    onClick={() => navigate("/app")}
    className="cursor-pointer rounded-lg border border-slate-700/60 px-3 py-2 text-sm text-slate-400 transition hover:border-rose-500 hover:text-white"
  >
    ← Back
  </button>
</div>
       
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-slate-700/60 bg-[#0e1626] md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr_240px]">

        {/* LEFT: sections */}
        <aside className="border-b border-slate-700/60 p-4 md:border-b-0 md:border-r">
          <p className="mb-3 hidden text-xs font-semibold text-slate-500 md:block">Sections</p>
          <nav className="flex gap-2 overflow-x-auto md:flex-col">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  active === key
                    ? "bg-rose-500/15 text-rose-400"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MIDDLE: content */}
        <main className="min-h-105 p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <h1 className="text-base font-semibold text-white">
              {tabs.find((t) => t.key === active).label}
            </h1>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-400">
              {active === "technical" && `${technical.length} questions`}
              {active === "behavioral" && `${behavioral.length} questions`}
              {active === "roadmap" && `${plans.length} days`}
            </span>
          </div>

          {active === "technical" && <Questions list={technical} />}
          {active === "behavioral" && <Questions list={behavioral} />}

          {active === "roadmap" && (
            <ol className="space-y-6 border-l border-slate-700/70 pl-6">
              {plans.map((p) => (
                <li key={p.day} className="relative">
                  <span className="absolute -left-7.75 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {p.day}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Day {p.day}: {p.focus}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {p.tasks?.map((t, i) => (
                      <li key={i} className="text-sm text-slate-300">• {t}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          )}
        </main>

        {/* RIGHT: score + skill gaps */}
        <aside className="border-t border-slate-700/60 p-5 md:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0">
          <p className="mb-3 text-xs font-semibold text-slate-500">Match score</p>

          <div className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-emerald-500">
            <span className="text-2xl font-bold text-white">{report.matchScore ?? 0}</span>
            <span className="-mt-1 text-[10px] text-slate-400">%</span>
          </div>
          <p className="mt-2 text-center text-[11px] text-emerald-400">Strong match for this role</p>

          <p className="mb-3 mt-8 text-xs font-semibold text-slate-500">Skill gaps</p>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {skillGaps.map((g, i) => (
              <span
                key={i}
                className={`rounded-md border px-2.5 py-1.5 text-[11px] font-medium ${
                  severityStyle[g.severity] || severityStyle.low
                }`}
              >
                {g.skill}
              </span>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Interview;