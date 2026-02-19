"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ClassSidebar,
  ClassTabs,
} from "@/components/class_dashboard";
import { 
  ChevronLeftIcon, 
  ClipboardIcon, 
  BookIcon, 
  DocumentIcon,
  PlusIcon,
  MoreVerticalIcon
} from "@/components/class_dashboard/icons";
import MainNavigation from "@/components/navigation/Navigation";
import RecentClassesSidebar from "@/components/layout/RecentClassesSidebar";
import { HomeIcon, ReportIcon, BellIcon, LockIcon } from "@/components/dashboard/icons";

type TabId = "general" | "assignment" | "posts" | "quiz" | "students" | "files" | "grades";

/**
 * AssignmentDetailPage - Individual assignment/quiz submission page
 */
export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabId>("assignment");
  const [classList, setClassList] = useState<any[]>([]);

  // Extract classId from URL or use default
  const classId = "flutter"; // You can get this from query params or context

  // Handle tab change - navigate back to class dashboard
  const handleTabChange = (tab: TabId) => {
    router.push(`/class/${classId}`);
  };

  // Fetch class list for sidebar
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/classes");
        const j = await res.json();
        if (mounted && j?.ok && Array.isArray(j.data)) setClassList(j.data);
      } catch (e) {}
    })();
    return () => { mounted = false; };
  }, []);

  // Mock data - replace with API call
  const assignment = {
    title: "WB-CHALLENGE-Weather",
    type: "Quiz",
    dueDate: "Due at 11:59 PM",
    module: "Module WB - List & Callbacks",
    gradingStatus: "Good",
    score: "100/2",
    instruction: `Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks Module WB - List & Callbacks`,
    referenceMaterials: [
      { name: "Assignment.docx", type: "document" }
    ]
  };

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
          badge: 0
        }))}
        activeClassId={classId}
        onClassSelect={id => {
          if (id !== classId) window.location.href = `/class/${id}`;
        }}
      />
      {/* Class Sidebar (middle left) */}
      <ClassSidebar classId={classId} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Tabs Navigation */}
        <ClassTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Assignment Detail Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-5xl mx-auto p-6">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Assignment Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                    <ClipboardIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{assignment.title}</h2>
                    <p className="text-sm text-slate-600 mb-3">{assignment.dueDate}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                      <BookIcon className="w-4 h-4" />
                      <span>{assignment.module}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Grading status</p>
                    <p className="text-base font-bold text-green-600">{assignment.gradingStatus}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Score</p>
                    <p className="text-base font-bold text-slate-900">{assignment.score}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Instruction</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {assignment.instruction}
                </p>
              </div>
            </div>

            {/* Reference Materials Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-5">Reference materials</h3>
              <div className="space-y-3">
                {assignment.referenceMaterials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <DocumentIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{material.name}</span>
                    </div>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVerticalIcon className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* My Work Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-xl font-bold text-slate-900">My work</h3>
                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">add work</span>
              </div>
              <div className="flex items-center justify-between p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <DocumentIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Create your new Card</span>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreVerticalIcon className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="px-8 py-4 bg-[#0a1e3d] text-white rounded-xl font-semibold hover:bg-[#081729] transition-all shadow-lg hover:shadow-xl flex items-center gap-3 text-base">
              <PlusIcon className="w-5 h-5" />
              <span>Submit</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
