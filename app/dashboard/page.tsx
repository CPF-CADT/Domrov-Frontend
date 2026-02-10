"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ClassGrid from "@/components/dashboard/ClassGrid";
import Sidebar from "@/components/dashboard/Sidebar";
import TermFilters from "@/components/dashboard/TermFilters";
import {
  BellIcon,
  BookIcon,
  HomeIcon,
  LockIcon,
  ReportIcon,
} from "@/components/dashboard/icons";
import type { ClassCard } from "@/components/dashboard/types";
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

// --- Helpers ---
const handleOpen = (id: string) => {
  console.log(`Open class ${id}`);
};

/**
 * DashboardPage - Main dashboard view for class management.
 * Displays sidebar navigation, header with filters, and class grid.
 */
export default function DashboardPage() {
  const classes = classesData as ClassCard[];
  const { activeTerm, setActiveTerm, filteredClasses } =
    useDashboardFilters(classes);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar items={sidebarItems} activeId="classes" />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader activeTerm={activeTerm} onChangeTerm={setActiveTerm} />

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
    </div>
  );
}
