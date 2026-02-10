export type Term = "All" | "Term1" | "Term2" | "Term3";

export interface ClassCard {
  id: string;
  name: string;
  track: string;
  term: Term;
  accent: string;
  gradient: string;
}
