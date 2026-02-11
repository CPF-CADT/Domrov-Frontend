import { Icon } from "@/components/common";
import type { IconCard } from "@/constants/landing";

interface ProblemCardProps {
  item: IconCard;
}

/**
 * ProblemCard - Displays a problem/solution item with icon.
 * Used in ProblemSolutionSection for showing challenges and solutions.
 */
export default function ProblemCard({ item }: ProblemCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-6 border border-blue-200 shadow-lg hover:shadow-2xl transition-all">
      <Icon name={item.icon} size="4xl" className="text-primary" />
      <div className="flex flex-col gap-2">
        <h3 className="text-primary text-xl font-bold leading-tight">
          {item.title}
        </h3>
        <p className="text-slate-600 text-base leading-normal">{item.desc}</p>
      </div>
    </div>
  );
}
