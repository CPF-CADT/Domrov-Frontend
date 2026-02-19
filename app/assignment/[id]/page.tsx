"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ClassSidebar,
  ClassTabs,
} from "@/components/class_dashboard";
import { 
  ChevronRightIcon,
} from "@/components/class_dashboard/icons";
import MainNavigation from "@/components/navigation/Navigation";
import RecentClassesSidebar from "@/components/layout/RecentClassesSidebar";
import { HomeIcon, ReportIcon, BellIcon, LockIcon } from "@/components/dashboard/icons";

type TabId = "general" | "assignment" | "posts" | "quiz" | "students" | "files" | "grades";

/**
 * AssignmentDetailPage - Individual assignment/quiz submission page
 * Redesigned to match the reference image with perfect UI/UX
 */
export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabId>("assignment");
  const [classList, setClassList] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: "sorting_logic_v2.py", size: "14.2 KB", uploadedAt: "2 mins ago" },
    { name: "performance_report.zip", size: "87.8 MB", uploadedAt: "1 min ago" }
  ]);

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
    title: "Assignment 3: Data Sorting Algorithms",
    description: "Implement efficient sorting methods using Python and analyze their complexity",
    dueDate: "Oct 25, 11:59 PM",
    course: "CS101: Intro to Algorithms",
    objective: "Create a Python script that implements the following sorting algorithms: QuickSort, MergeSort, and HeapSort. Compare their performance on datasets of varying sizes (1k, 10k, and 100k elements).",
    requirements: [
      "All code must be written in Python 3.9+.",
      "Provide comments explaining the time complexity of each function.",
      "Include a small PDF report with the performance graphs.",
      "Package all files into a single ZIP archive or upload them individually."
    ],
    gradingRubric: "Download PDF Rubric ⬇️",
    referenceMaterials: [
      { name: "Assignment.docx", type: "document" }
    ],
    status: "SUBMITTED",
    progress: { current: 3, total: 5 },
    progressPercent: 100,
    submittedAt: "Oct 24, 2023 2:45 PM"
  };

  const sidebarItems = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "classes", label: "Classes", icon: BookIcon },
    { id: "reports", label: "Reports", icon: ReportIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "lock", label: "Lock", icon: LockIcon },
  ];

  // File upload handlers
  const handleFilesAdded = (newFiles: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileRemoved = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Main Navigation (far left) */}
      <MainNavigation items={sidebarItems} activeId="classes" />
      {/* Recent Classes Sidebar (left) */}
      {/* Class Sidebar (middle left) */}
      <ClassSidebar classId={classId} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area - Full Width */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header - Full Width */}
        <AssignmentHeader />

        {/* Content Area with Two Columns */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <span className="text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">Courses</span>
              <ChevronRightIcon className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 hover:text-slate-900 cursor-pointer transition-colors">{assignment.course}</span>
              <ChevronRightIcon className="w-4 h-4 text-slate-400" />
              <span className="text-slate-900 font-medium">Assignment Submission</span>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
              {/* Left Column - Assignment Title, Instructions & Reference Materials */}
              <div className="space-y-6">
                {/* Assignment Title Section */}
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{assignment.title}</h1>
                  <p className="text-slate-600">{assignment.description}</p>
                </div>
                {/* Assignment Instructions Card */}
                <AssignmentInstructions
                  dueDate={assignment.dueDate}
                  objective={assignment.objective}
                  requirements={assignment.requirements}
                  gradingRubric={assignment.gradingRubric}
                />

                {/* Reference Materials Section */}
                <ReferenceMaterials materials={assignment.referenceMaterials} />
              </div>

              {/* Right Column - Student Portal */}
              <div className="space-y-6">
                <StudentPortal
                  status={assignment.status}
                  progress={assignment.progress}
                  progressPercent={assignment.progressPercent}
                  submittedAt={assignment.submittedAt}
                  uploadedFiles={uploadedFiles}
                  onFilesAdded={handleFilesAdded}
                  onFileRemoved={handleFileRemoved}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
