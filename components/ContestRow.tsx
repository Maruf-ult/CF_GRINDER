"use client";
import { CFContest, CFProblem } from "@/types/codeforces";

interface ContestRowProps {
  contest: CFContest;
  problems: CFProblem[];
  solvedSet: Set<string>;
}

export default function ContestRow({
  contest,
  problems,
  solvedSet,
}: ContestRowProps) {
  
  
  const getRatingTextColor = (rating: number | undefined) => {
    if (!rating) return "text-gray-500";
    if (rating < 1200) return "text-[#888888]"; 
    if (rating < 1400) return "text-[#008000]"; 
    if (rating < 1600) return "text-[#03a89e]"; 
    if (rating < 1900) return "text-[#0000ff]"; 
    if (rating < 2100) return "text-[#aa00aa]"; 
    if (rating < 2400) return "text-[#ff8c00]"; 
    return "text-[#ff0000]"; 
  };


  const getUnsolvedBg = (rating: number | undefined) => {
    if (!rating) return "bg-slate-50 border-slate-200";
    if (rating <= 1100) return "bg-blue-100 border-blue-200 hover:bg-blue-200";
    if (rating <= 1400) return "bg-cyan-100 border-cyan-200 hover:bg-cyan-200";
    if (rating <= 1700) return "bg-indigo-100 border-indigo-200 hover:bg-indigo-200";
    if (rating <= 2000) return "bg-violet-100 border-violet-200 hover:bg-violet-200";
    return "bg-fuchsia-100 border-fuchsia-200 hover:bg-fuchsia-200";
  };

  return (
    <table className="w-full border-separate border-spacing-0 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-400 transition-all ">
      <tbody>
        <tr>
          <td className="w-1/4 md:w-1/5 bg-blue-50 hover:bg-blue-100 p-4 border-r border-gray-200 align-middle">
            <div className="flex flex-col">
              <a
                href={`https://codeforces.com/contest/${contest.id}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight"
                title={contest.name}
              >
                {contest.name}
              </a>
              <span className="text-[10px] text-gray-400 font-mono mt-1">
                ID: {contest.id}
              </span>
            </div>
          </td>

          <td className="pl-3 bg-white py-4">
            <div className="flex flex-wrap gap-2">
              {problems.map((prob) => {
                const problemId = `${prob.contestId}${prob.index}`;
                const isSolved = solvedSet.has(problemId);
                const textColor = getRatingTextColor(prob.rating);
                const unsolvedStyle = getUnsolvedBg(prob.rating);
                const solvedStyle = "bg-[#d4edda] border-[#c3e6cb] hover:bg-[#c3e6cb]";

                return (
                  <a
                    key={prob.index}
                    href={`https://codeforces.com/contest/${prob.contestId}/problem/${prob.index}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex flex-col items-center justify-between p-2 w-34 h-30 rounded border transition-all
                      ${isSolved ? solvedStyle : unsolvedStyle}
                    `}
                    title={prob.name}
                  >
                    <span className={`text-[10px] font-black uppercase ${textColor}`}>
                      {prob.index}
                    </span>

                    <div className="flex-1 flex items-center justify-center overflow-hidden my-1">
                      <span className={`text-[11px] leading-tight text-center font-bold line-clamp-2 px-1 ${textColor}`}>
                        {prob.name}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm border ${
                        isSolved 
                          ? `bg-[#ffffff80] border-[#15572420] ${textColor}` 
                          : `bg-white/60 border-current/20 ${textColor}`
                      }`}>
                        {prob.rating || "???"}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}