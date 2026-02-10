import { Icon } from "@/components/common";
import type { IconCard } from "@/constants/landing";

interface FeatureCardProps {
  item: IconCard;
}

/**
 * FeatureCard - Displays a feature with icon, title, and description.
 * Used in CoreFeaturesSection for displaying platform capabilities.
 */
export default function FeatureCard({ item }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-blue-200 bg-white p-6 shadow-lg hover:shadow-2xl transition-all">
      <Icon name={item.icon} size="3xl" className="text-primary" />
      <div className="flex flex-col gap-1">
        <h3 className="text-primary text-lg font-bold">{item.title}</h3>
        <p className="text-slate-600 text-base">{item.desc}</p>
      </div>
    </div>
  );
}
