"use client";

import { CheckCircleIcon, ChevronRightIcon, InfoIcon } from "@/components/class_dashboard/icons";
import UploadSection, { UploadedFile } from "./UploadSection";

interface StudentPortalProps {
  status: string;
  progress: { current: number; total: number };
  progressPercent: number;
  submittedAt?: string;
  uploadedFiles: UploadedFile[];
  onFilesAdded: (files: UploadedFile[]) => void;
  onFileRemoved: (index: number) => void;
}

/**
 * StudentPortal - Complete student portal with progress, upload, and help sections
 */
export default function StudentPortal({
  status,
  progress,
  progressPercent,
  submittedAt,
  uploadedFiles,
  onFilesAdded,
  onFileRemoved
}: StudentPortalProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-6">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Student Portal</h2>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            <CheckCircleIcon className="w-4 h-4" />
            {status}
          </span>
        </div>

        {/* Progress Indicator */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              STEP {progress.current} OF {progress.total}
            </span>
            <span className="text-sm font-bold text-blue-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-600">
            {progressPercent === 100 ? "Submission complete! You can still resubmit until deadline." : "Complete all steps to submit your assignment."}
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="p-6">
        <UploadSection 
          uploadedFiles={uploadedFiles}
          onFilesAdded={onFilesAdded}
          onFileRemoved={onFileRemoved}
        />

        {/* Submission Status */}
        {status === "SUBMITTED" && submittedAt && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 mt-6">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-green-900 mb-1">Submission Received</h4>
                <p className="text-xs text-green-700">Time: {submittedAt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mb-6 mt-6">
          <button className="w-full px-6 py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2">
            <span>Resubmit Assignment</span>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
          <button className="w-full px-6 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-900 rounded-xl font-semibold transition-all hover:bg-slate-50">
            View Submission Receipt
          </button>
        </div>

        {/* Need Help Section */}
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl p-6">
          <h4 className="text-base font-bold text-white mb-2">Need Help?</h4>
          <p className="text-sm text-slate-300 mb-4">If you encounter issues during upload, please contact our support team immediately.</p>
          <button className="w-full px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
            <InfoIcon className="w-5 h-5" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}
