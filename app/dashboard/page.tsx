"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ClassGrid from "@/components/dashboard/ClassGrid";
import TermFilters from "@/components/dashboard/TermFilters";
import JoinClassModal from "@/components/dashboard/JoinClassModal";
import CreateClassModal, {
  type CreateClassData,
} from "@/components/dashboard/CreateClassModal";
import {
  BellIcon,
  BookIcon,
  HomeIcon,
  LockIcon,
  ReportIcon,
} from "@/components/dashboard/icons";
import type { ClassCard } from "@/components/dashboard/types";
import type { Class } from "@/types/class";
import { useDashboardFilters } from "@/hooks";
import classesData from "@/data/classes.json";

// --- Constants ---
const sidebarItems = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "classes", label: "Classes", icon: BookIcon },
  { id: "reports", label: "Reports", icon: ReportIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "lock", label: "Lock", icon: LockIcon },
];

import { CLASS_GRADIENTS, CLASS_ACCENT_COLORS } from "@/constants/class";
import MainNavigation from "@/components/navigation/Navigation";

const generateUniqueId = () => {
  return `class-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * DashboardPage - Main dashboard view for class management.
 * Displays sidebar navigation, header with filters, and class grid.
 */
export default function DashboardPage() {
  const router = useRouter();
  
  // Load classes from API on mount so we use persisted + volatile combined state
  const [classList, setClassList] = useState<ClassCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/classes");
        const j = await res.json();
        if (mounted && j?.ok && Array.isArray(j.data))
          setClassList(j.data as any);
      } catch (e) {
        console.error("Failed to fetch classes:", e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const { activeTerm, setActiveTerm, filteredClasses } =
    useDashboardFilters(classList);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Navigate to class dashboard when a class card is clicked
  const handleOpen = (id: string) => {
    router.push(`/class/${id}`);
  };

  const handleJoinClass = (code: string) => {
    // Find class by join_code in classList
    const found = classList.find((c: any) => c.join_code === code);
    if (found) {
      alert(`Joined class: ${found.name}`);
    } else {
      alert("Invalid class code");
    }
    setIsJoinModalOpen(false);
  };

  const handleCreateClass = async (data: CreateClassData) => {
    const randomIndex = Math.floor(Math.random() * CLASS_GRADIENTS.length);
    const newClass: ClassCard = {
      class_id: Date.now(),
      id: Date.now().toString(),
      name: data.name,
      group: data.group,
      generation: data.generation,
      description: "",
      join_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      owner_id: 1,
      cover_image_url: "",
      status: data.status,
      track: data.group,
      term: "Term1",
      accent: CLASS_ACCENT_COLORS[randomIndex],
      gradient: CLASS_GRADIENTS[randomIndex],
    };
    try {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClass),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        // Use response body if provided
        if (json?.data && Array.isArray(json.data)) {
          setClassList(json.data as any);
        } else {
          // Fetch latest list from API as fallback
          try {
            const resp = await fetch("/api/classes");
            const j = await resp.json();
            if (j?.ok && Array.isArray(j.data)) setClassList(j.data as any);
            else setClassList((prev) => [newClass, ...prev]);
          } catch (e) {
            setClassList((prev) => [newClass, ...prev]);
          }
        }
        if (json?.volatile)
          alert(
            "Class created but not persisted to disk (in-memory fallback).",
          );
      } else {
        alert(
          "Failed to save class to JSON file: " +
            (json?.details || JSON.stringify(json)),
        );
      }
    } catch (err) {
      alert("Error saving class: " + err);
    }
    setIsCreateModalOpen(false);
  };

  // Handler for main navigation
  const handleNav = (id: string) => {
    if (id === "classes") return;
    // Add navigation logic for other items
    router.push(`/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Main Navigation (far left) */}
      <MainNavigation items={sidebarItems} activeId="classes" onNavigate={handleNav} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeTerm={activeTerm}
          onChangeTerm={setActiveTerm}
          onCreateClass={() => setIsCreateModalOpen(true)}
          onJoinClass={() => setIsJoinModalOpen(true)}
        />
        <div className="p-4">
          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/classes");
                const json = await res.json();
                alert(JSON.stringify(json, null, 2));
              } catch (err) {
                alert("Diagnostic request failed: " + err);
              }
            }}
            className="px-3 py-1 text-sm rounded-md bg-slate-100"
          >
            Run API Diagnostic
          </button>
        </div>

        <main className="px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Classes</h2>
              <p className="text-sm text-slate-500">
                Browse and manage your cohorts
              </p>
            </div>
            <TermFilters activeTerm={activeTerm} onChange={setActiveTerm} />
          </div>

          <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            <ClassGrid items={filteredClasses} onOpen={handleOpen} />
          </div>
        </main>
      </div>

      <JoinClassModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinClass}
      />

      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateClass}
      />
    </div>
  );
}
