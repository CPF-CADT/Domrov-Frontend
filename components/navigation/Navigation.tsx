import React from "react";

/**
 * MainNavigation - Vertical sidebar navigation for main app sections.
 * Reusable across layouts. Accepts items and activeId props.
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MainNavigationProps {
  items: NavigationItem[];
  activeId: string;
  onNavigate?: (id: string) => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ items, activeId, onNavigate }) => {
  return (
    <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 space-y-6 min-h-screen">
      <div className="h-10 w-10 rounded-xl bg-[#0B1531] flex items-center justify-center text-white font-black text-sm mb-2">
        <span className="tracking-tight">DR</span>
      </div>
      <nav className="flex flex-col items-center space-y-5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              className={`h-11 w-11 rounded-lg flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-[#0B1531] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              aria-label={item.label}
              onClick={() => onNavigate?.(item.id)}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default MainNavigation;
