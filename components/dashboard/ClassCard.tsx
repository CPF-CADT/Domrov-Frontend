"use client";

import { useRouter } from "next/navigation";
import CardFooterActions from "@/components/ui/CardFooterActions";
import CardHeaderGradient from "@/components/ui/CardHeaderGradient";
import type { ClassCard as ClassCardType } from "./types";

interface ClassCardProps {
  classItem: ClassCardType;
  onOpen?: (id: string) => void;
}

/**
 * ClassCard - Displays a class with gradient header, term, and actions.
 * Uses card-surface styling for consistent card appearance.
 */
export default function ClassCard({ classItem, onOpen }: ClassCardProps) {
  const router = useRouter();
  
  const handleOpen = () => {
    if (onOpen) {
      onOpen(classItem.id);
    } else {
      // Navigate to class dashboard page
      router.push(`/class/${classItem.id}`);
    }
  };

  return (
    <article 
      className="card-surface cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleOpen}
    >
      <CardHeaderGradient
        gradientClass={classItem.gradient}
        label={classItem.name}
      />

      <div className="p-4">
        <p className="text-sm text-slate-500">{classItem.term}</p>
        <h3 className="text-base font-semibold text-slate-900 mt-1">
          {classItem.name}
        </h3>

        <CardFooterActions accent={classItem.accent} onOpen={undefined} />
      </div>
    </article>
  );
}
