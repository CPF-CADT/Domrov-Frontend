import { SectionHeader } from "@/components/common";
import ProblemCard from "@/components/ui/ProblemCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PROBLEM_SOLUTION } from "@/constants/landing";

/**
 * ProblemSolutionSection - Displays challenge and solution cards.
 * Shows the problem Domrov solves and the outcomes.
 */
export default function ProblemSolutionSection() {
  return (
    <SectionWrapper className="bg-primary-light/40">
      <SectionHeader
        title="The Challenge and The Solution"
        centered
        className="mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROBLEM_SOLUTION.map((item) => (
          <ProblemCard key={item.id} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}
