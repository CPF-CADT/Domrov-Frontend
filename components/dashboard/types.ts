export type Term = "All" | "Term1" | "Term2" | "Term3";

import type { Class } from "@/types/class";

export interface ClassCard extends Class {
  id: string; // for UI key, can be class_id as string
  group: string;
  generation: string;
  track: string;
  term: Term;
  accent: string;
  gradient: string;
}
