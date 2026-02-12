"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ContestRow from "@/components/ContestRow";
import { CFContest, CFProblem, CFSubmission } from "@/types/codeforces";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All Contest");
  const [contests, setContests] = useState<CFContest[]>([]);
  const [problemMap, setProblemMap] = useState<Record<number, CFProblem[]>>({});
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const savedHandle = localStorage.getItem("cf_handle");
    const savedFilter = localStorage.getItem("cf_filter");

    if (savedHandle) {
      setUsername(savedHandle);
    }
    if(savedFilter){
      setActiveFilter(savedFilter);
    }
    setIsLoaded(true);
  }, []);


  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cf_handle", username);
      localStorage.setItem("cf_filter",activeFilter);
    }
  }, [username,activeFilter, isLoaded]);


  useEffect(() => {
    fetch("https://codeforces.com/api/contest.list?gym=false")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK") {
          setContests(data.result.filter((c: CFContest) => c.phase === "FINISHED"));
        }
      });

    fetch("https://codeforces.com/api/problemset.problems")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK") {
          const mapping: Record<number, CFProblem[]> = {};
          data.result.problems.forEach((prob: CFProblem) => {
            if (!mapping[prob.contestId]) mapping[prob.contestId] = [];
            mapping[prob.contestId].push(prob);
          });
          
          Object.keys(mapping).forEach((id) => {
            mapping[Number(id)].sort((a, b) => a.index.localeCompare(b.index));
          });
          setProblemMap(mapping);
        }
      });
  }, []);

  useEffect(() => {
    if (!username.trim()) {
      setSolvedSet(new Set());
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetch(`https://codeforces.com/api/user.status?handle=${username}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            const solved = new Set<string>(
              data.result
                .filter((sub: CFSubmission) => sub.verdict === "OK")
                .map((sub: CFSubmission) => `${sub.contestId}${sub.problem.index}`)
            );
            setSolvedSet(solved);
          } else {
            setSolvedSet(new Set()); 
          }
        })
        .catch(() => setSolvedSet(new Set()));
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

const filteredContests = contests.filter((c) => {
    if (activeFilter === "All Contest") return true;

    const contestName = c.name.toLowerCase();
    const filterLower = activeFilter.toLowerCase();

    if (activeFilter === "Educational Round") {
      return contestName.includes("educational");
    }

    if (activeFilter === "Div. 1 + Div. 2") {
      return contestName.includes("div. 1 + div. 2") || contestName.includes("combined");
    }

    if (activeFilter.startsWith("Div.")) {
      if (activeFilter === "Div. 1") {
        return contestName.includes("div. 1") && !contestName.includes("div. 1 + div. 2");
      }
      if (activeFilter === "Div. 2") {
        return contestName.includes("div. 2") && !contestName.includes("div. 1 + div. 2");
      }
      return contestName.includes(filterLower);
    }

    return contestName.includes(filterLower);
  });

  
  if (!isLoaded) return <div className="h-screen w-screen bg-zinc-50" />;

  return (
    <div className="flex flex-col h-screen w-screen bg-blue-50 font-sans">
      <Navbar 
        username={username} 
        setUsername={setUsername} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />
      <main className=" overflow-y-auto space-y-2">
        {filteredContests.length > 0 ? (
          filteredContests.slice(0, 100).map((contest) => (
            <ContestRow 
              key={contest.id} 
              contest={contest} 
              problems={problemMap[contest.id] || []} 
              solvedSet={solvedSet} 
            />
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 italic">
            No contests found for "{activeFilter}"
          </div>
        )}
      </main>
    </div>
  );
}