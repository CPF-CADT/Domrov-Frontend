"use client";

import { useRouter } from "next/navigation";
import { ClipboardIcon } from "./icons";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  dueTime: string;
  relativeDate: string;
  module: string;
  status?: "submitted" | "feedback" | "inactive";
  additionalStatus?: "feedback";
}

interface AssignmentCardProps {
  assignment: Assignment;
}

/**
 * AssignmentCard - Individual assignment card display.
 * Redesigned to match the reference design with better visual hierarchy.
 */
export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const router = useRouter();

  const getStatusBadge = () => {
    if (!assignment.status) return null;

    const statusConfig = {
      submitted: {
        icon: "✓",
        text: "Submitted",
        className: "bg-green-500 text-white",
      },
      feedback: {
        icon: "💬",
        text: "Feedback",
        className: "bg-blue-500 text-white",
      },
      inactive: {
        icon: "🔒",
        text: "Inactive",
        className: "bg-slate-800 text-white",
      },
    };

    const badges = [];
    const config = statusConfig[assignment.status];
    badges.push(
      <span key="main" className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.className}`}>
        <span>{config.icon}</span>
        {config.text}
      </span>
    );

    // Add additional feedback badge if present
    if (assignment.additionalStatus === "feedback") {
      const feedbackConfig = statusConfig.feedback;
      badges.push(
        <span key="feedback" className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${feedbackConfig.className}`}>
          <span>{feedbackConfig.icon}</span>
          {feedbackConfig.text}
        </span>
      );
    }

    return <div className="flex gap-2">{badges}</div>;
  };

  return (
    <div 
      onClick={() => router.push(`/assignment/${assignment.id}`)}
      className="bg-white border border-slate-300 rounded-xl p-5 hover:shadow-lg hover:border-slate-400 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Title */}
          <h4 className="font-semibold text-slate-900 text-lg">{assignment.title}</h4>
          
          {/* Due Time */}
          <p className="text-sm text-red-600 font-medium">
            Due at {assignment.dueTime}
          </p>
          
          {/* Module Info */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ClipboardIcon className="w-4 h-4 text-slate-500" />
            <span>{assignment.module}</span>
          </div>
        </div>

        {/* Status Badge */}
        {getStatusBadge()}
      </div>
    </div>
  );
}
