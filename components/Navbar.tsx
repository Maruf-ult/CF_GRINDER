"use client";

interface NavbarProps {
  username: string;
  setUsername: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
}

const FILTER_OPTIONS = [
  "All Contest",
  "Div. 1",
  "Div. 2",
  "Div. 3",
  "Div. 4",
  "Div. 1 + Div. 2",
  "Educational Round",
  "Kotlin",
  "CodeTON",
  "Global",
  "VK Cup",
  "April Fools",
];

export default function Navbar({
  username,
  setUsername,
  activeFilter,
  setActiveFilter,
}: NavbarProps) {
  return (
    <nav className="flex items-center space-x-4 border-b border-gray-200 bg-blue-50 p-12 sticky top-0 z-10 shadow-sm overflow-x-auto no-scrollbar">
      <input
        className="w-60 p-2 h-10 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black bg-white"
        type="text"
        placeholder="Enter Codeforces handle..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="flex items-center ml-4 space-x-2">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setActiveFilter(option)}
            className={`px-4.5 py-6 text-xs font-bold transition-all border cursor-pointer whitespace-nowrap  active:scale-95
              ${activeFilter === option 
                ? "bg-[#2164f3] text-white border-[#2164f3] shadow-md" 
                : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-400"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </nav>
  );
}