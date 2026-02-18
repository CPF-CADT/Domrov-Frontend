"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  ClassSidebar,
  ClassTabs,
  GeneralTab,
  AssignmentTab,
  PostsTab,
  QuizTab,
  StudentsTab,
  FilesTab,
  GradesTab,
} from "@/components/class_dashboard";

type TabId = "general" | "assignment" | "posts" | "quiz" | "students" | "files" | "grades";

/**
 * ClassDashboardPage - Main view for individual class with sidebar navigation and tabs.
 * Similar to Microsoft Teams class interface.
 */
export default function ClassDashboardPage() {
  const params = useParams();
  const classId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabId>("general");

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab classId={classId} />;
      case "assignment":
        return <AssignmentTab classId={classId} />;
      case "posts":
        return <PostsTab classId={classId} />;
      case "quiz":
        return <QuizTab classId={classId} />;
      case "students":
        return <StudentsTab classId={classId} />;
      case "files":
        return <FilesTab classId={classId} />;
      case "grades":
        return <GradesTab classId={classId} />;
      default:
        return <GeneralTab classId={classId} />;
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Left Sidebar */}
      <ClassSidebar classId={classId} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Tabs Navigation */}
        <ClassTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div key={activeTab} className="animate-fadeIn">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
