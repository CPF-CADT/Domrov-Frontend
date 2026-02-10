import IconButton from "@/components/dashboard/IconButton";
import { BellIcon, CogIcon, UserIcon } from "@/components/dashboard/icons";
import type { Term } from "@/components/dashboard/types";

interface DashboardHeaderProps {
  activeTerm: Term;
  onChangeTerm: (term: Term) => void;
}

export default function DashboardHeader({
  activeTerm,
  onChangeTerm,
}: DashboardHeaderProps) {
  return (
    <header className="bg-primary text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-lg font-black">
          DR
        </div>
        <div>
          <p className="text-xs text-blue-100">Dashboard</p>
          <h1 className="text-xl font-semibold">Classes</h1>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 text-sm">
          <span className="text-blue-100">Filter:</span>
          <select
            className="bg-transparent text-white font-semibold focus:outline-none"
            value={activeTerm}
            onChange={(event) => onChangeTerm(event.target.value as Term)}
          >
            <option value="All">All Class</option>
            <option value="Term1">Term1</option>
            <option value="Term2">Term2</option>
            <option value="Term3">Term3</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-white text-primary font-semibold rounded-md shadow-sm hover:bg-blue-50">
          + Create Class
        </button>
        <button className="px-4 py-2 bg-white text-primary font-semibold rounded-md shadow-sm hover:bg-blue-50">
          + Join Class
        </button>
        <div className="flex items-center space-x-3">
          <IconButton ariaLabel="Notifications">
            <BellIcon className="h-5 w-5" />
          </IconButton>
          <IconButton ariaLabel="Settings">
            <CogIcon className="h-5 w-5" />
          </IconButton>
          <div className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center text-primary font-bold">
            <UserIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
