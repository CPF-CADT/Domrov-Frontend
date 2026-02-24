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
import RecentClassesSidebar from "@/components/layout_temp/RecentClassesSidebar";
import { HomeIcon, ReportIcon, BellIcon, LockIcon, BookIcon } from "@/components/dashboard/icons";
import {
  AssignmentHeader,
  AssignmentInstructions,
  ReferenceMaterials,
  StudentPortal,
  type UploadedFile
} from "@/components/assignment";
import IDE from "@/components/assignment/IDE";

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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

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

  // Fetch existing submissions
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/assignments/upload?assignmentId=${assignmentId}&userId=1`);
        const j = await res.json();
        if (mounted && j?.success && Array.isArray(j.data) && j.data.length > 0) {
          const latestSubmission = j.data[j.data.length - 1];
          const files = [
            ...(latestSubmission.files || []).map((f: any) => ({
              name: f.name,
              size: typeof f.size === 'number' ? formatFileSize(f.size) : f.size,
              uploadedAt: new Date(f.uploadedAt).toLocaleString(),
              path: f.path,
              type: 'file' as const
            })),
            ...(latestSubmission.links || []).map((l: any) => ({
              name: l.url,
              size: 'Link',
              uploadedAt: new Date(l.addedAt).toLocaleString(),
              type: 'link' as const,
              url: l.url
            }))
          ];
          setUploadedFiles(files);
        }
      } catch (e) {
        console.error('Failed to fetch submissions:', e);
      }
    })();
    return () => { mounted = false; };
  }, [assignmentId]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

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

  const handleUploadComplete = (data: any) => {
    console.log('Upload complete:', data);
    // You can show a success message or update UI here
  };

  const handleFileClick = async (file: UploadedFile) => {
    if (!file.path) return;
    
    try {
      const response = await fetch(file.path);
      const content = await response.text();
      
      setSelectedFile({
        type: 'file',
        name: file.name,
        path: file.path,
        content: content
      });
      setShowPreview(true);
    } catch (error) {
      console.error('Failed to load file:', error);
      alert('Could not preview file. The file might not be accessible.');
    }
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
                  assignmentId={assignmentId}
                  userId="1"
                  onUploadComplete={handleUploadComplete}
                  onFileClick={handleFileClick}
                />
              </div>
            </div>

            {/* File Preview Modal */}
            {showPreview && selectedFile && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">
                      📄 {selectedFile.name}
                    </h3>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 p-4">
                    <IDE
                      file={selectedFile}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
