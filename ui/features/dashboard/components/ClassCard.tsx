"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CardFooterActions from "@/ui/design-system/primitives/CardFooterActions";
import CardHeaderGradient from "@/ui/design-system/primitives/CardHeaderGradient";
import type { ClassCard as ClassCardType } from "@/types/classCard";

interface ClassCardProps {
  classItem: ClassCardType;
  onOpen?: (id: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * ClassCard - Displays a class with gradient header, term, and actions.
 * Uses card-surface styling for consistent card appearance.
 */
export default function ClassCard({ classItem, onOpen, onDelete }: ClassCardProps) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleOpen = () => {
    if (onOpen) {
      onOpen(classItem.id);
    } else {
      // Navigate to class dashboard page
      router.push(`/class/${classItem.id}`);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(classItem.id);
    }
    setShowDropdown(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement edit functionality
    alert("Edit functionality coming soon!");
    setShowDropdown(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <article 
      className="card-surface cursor-pointer hover:shadow-lg transition-shadow relative"
      onClick={handleOpen}
    >
      <CardHeaderGradient
        gradientClass={classItem.gradient}
        label={classItem.name}
      />

      <div className="p-4">
        {/* Dropdown Menu Button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={toggleDropdown}
            className="p-1.5 rounded-lg bg-white/90 hover:bg-white shadow-sm transition-colors"
            aria-label="More options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                }}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 z-20">
                <div className="py-1">
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-sm text-slate-500">{classItem.term}</p>
        <h3 className="text-base font-semibold text-slate-900 mt-1">
          {classItem.name}
        </h3>

        <CardFooterActions accent={classItem.accent} onOpen={undefined} />
      </div>
    </article>
  );
}
