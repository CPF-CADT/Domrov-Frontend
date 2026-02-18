"use client";

import { useRouter } from "next/navigation";
import { 
  ChevronLeftIcon, 
  MoreVerticalIcon, 
  GraduationCapIcon, 
  LightbulbIcon, 
  TvIcon 
} from "./icons";

type TabId = "general" | "assignment" | "posts" | "quiz" | "students" | "files" | "grades";

interface ClassSidebarProps {
  classId: string;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

/**
 * ClassSidebar - Left sidebar navigation for class dashboard.
 * Shows class info and navigation items.
 */
export default function ClassSidebar({ classId, activeTab, onTabChange }: ClassSidebarProps) {
  const router = useRouter();

  const navItems = [
    { id: "general" as TabId, icon: TvIcon, label: "General" },
    { id: "assignment" as TabId, icon: GraduationCapIcon, label: "Assignment" },
    { id: "quiz" as TabId, icon: LightbulbIcon, label: "Quiz" },
    { id: "grades" as TabId, icon: TvIcon, label: "Grades" },
  ];

  return (
    <aside className="w-80 bg-[#0a1e3d] text-white flex flex-col h-screen">
      {/* Back Button */}
      <div className="p-4 border-b border-white/10">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Class Info */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
            <GraduationCapIcon className="w-8 h-8" />
          </div>
          <button className="text-white/60 hover:text-white">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-1">Database Class, Diagram</h2>
        <p className="text-sm text-white/60">Term 1 • 2024</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        {/* Main Nav Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? "bg-white/10 text-white border-l-4 border-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
