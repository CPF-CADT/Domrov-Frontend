import React from 'react';

interface ClassAvatarItemProps {
  name: string;
  code: string;
  badge?: number;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Renders a circular class avatar with code, name, and optional badge.
 * - Active state: highlighted, shadow, border
 * - Hover: smooth effect
 * - Badge: small count (if exists)
 */
const ClassAvatarItem: React.FC<ClassAvatarItemProps> = ({
  name,
  code,
  badge = 0,
  active = false,
  onClick,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center my-2 cursor-pointer transition-all duration-200 group p-2 min-w-[64px]`}
      onClick={onClick}
      title={name}
      style={{ position: 'relative' }}
    >
      <div
        className={`w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-400 text-white font-medium text-xs shadow-lg ${
          active ? 'ring-2 ring-blue-400 scale-105' : 'hover:scale-105'
        }`}
      >
        {code}
      </div>
      {badge > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow-lg border-2 border-[#101A36] z-10">
          {badge}
        </span>
      )}
      <span className="mt-2 text-[10px] text-white text-center w-16 truncate opacity-80 group-hover:opacity-100 font-medium">
        {name}
      </span>
    </div>
  );
};

export default ClassAvatarItem;
