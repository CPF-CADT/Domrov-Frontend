import React from 'react';
import ClassAvatarItem from './ClassAvatarItem';

/**
 * Props for RecentClassesSidebar
 * @prop classes - Array of class objects { id, name, code, badge }
 * @prop activeClassId - Currently active class id
 * @prop onClassSelect - Handler when a class avatar is clicked
 */
interface RecentClassesSidebarProps {
  classes?: Array<{
    id: string;
    name: string;
    code: string;
    badge?: number;
  }>;
  activeClassId?: string;
  onClassSelect?: (id: string) => void;
}

/**
 * Sidebar showing recently accessed classes as avatars.
 * - Scrollable, dark theme, active highlight, smooth hover
 * - Clicking switches class (calls onClassSelect)
 * - Robust: handles undefined/empty classes
 */
const RecentClassesSidebar: React.FC<RecentClassesSidebarProps> = ({
  classes = [],
  activeClassId,
  onClassSelect,
}) => {
  return (
    <aside className="w-20 bg-[#131e36] flex flex-col items-center py-6 shadow-xl h-screen overflow-y-auto">
      {/* Header */}
      <div className="mb-4 w-full flex flex-col items-center">
        <span className="text-xs text-white/60 font-semibold tracking-wide uppercase mb-2">CLASSES</span>
        <div className="w-10 h-2 rounded-full bg-gradient-to-r from-blue-400/30 to-blue-200/10 mb-1" />
      </div>
      {/* Class Avatars */}
      <div className="flex flex-col gap-0.5 w-full items-center">
        {classes.length === 0 ? (
          <span className="text-xs text-white/40 mt-8">No recent classes</span>
        ) : (
          classes.map((cls) => (
            <ClassAvatarItem
              key={cls.id}
              name={cls.name}
              code={cls.code}
              badge={cls.badge}
              active={cls.id === activeClassId}
              onClick={() => onClassSelect?.(cls.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
};

export default RecentClassesSidebar;
