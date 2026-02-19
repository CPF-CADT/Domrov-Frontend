"use client";

import { useState, useEffect } from "react";
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
import RecentClassesSidebar from "@/components/layout/RecentClassesSidebar";
import MainNavigation from "@/components/navigation/Navigation";
import { HomeIcon, BookIcon, ReportIcon, BellIcon, LockIcon } from "@/components/dashboard/icons";

type TabId = "general" | "assignment" | "posts" | "quiz" | "students" | "files" | "grades";

/**
 * ClassDashboardPage - Main view for individual class with sidebar navigation and tabs.
 * Similar to Microsoft Teams class interface.
 */
export default function ClassDashboardPage() {
  const params = useParams();
  const classId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [classList, setClassList] = useState<any[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/classes");
        const j = await res.json();
        if (mounted && j?.ok && Array.isArray(j.data)) setClassList(j.data);
      } catch (e) {
        // fallback: do nothing
      }
    })();
    return () => { mounted = false; };
  }, []);

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

  // Reuse the same sidebar items as dashboard
  const sidebarItems = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "classes", label: "Classes", icon: BookIcon },
    { id: "reports", label: "Reports", icon: ReportIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "lock", label: "Lock", icon: LockIcon },
  ];

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Main Navigation (far left) */}
      <MainNavigation items={sidebarItems} activeId="classes" />
      {/* Recent Classes Sidebar (left) */}
      <RecentClassesSidebar
        classes={classList.map(cls => ({
          id: cls.id,
          name: cls.name,
          code: cls.group || cls.join_code || cls.track || '',
          badge: 0 // Optionally, set badge count if available
        }))}
        activeClassId={classId}
        onClassSelect={id => {
          if (id !== classId) window.location.href = `/class/${id}`;
        }}
      />
      {/* Class Sidebar (middle left) */}
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
