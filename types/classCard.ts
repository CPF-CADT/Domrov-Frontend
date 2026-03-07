import type { Class } from "./class";

export type Term = "All" | "Term1" | "Term2" | "Term3";

export interface ClassCard extends Class {
  id: string;
  track: string;
  term: Term;
  accent: string;
  gradient: string;
}

export interface CreateClassInput {
  name: string;
  group: string;
  generation: string;
  status?: string;
  description?: string;
  owner_id?: number;
  cover_image_url?: string;
}
