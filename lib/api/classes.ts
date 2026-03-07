import type { ClassCard } from "@/types/classCard";

export interface CreateClassClientInput {
    name: string;
    group: string;
    generation: string;
    status?: string;
}

export async function fetchClasses(): Promise<ClassCard[]> {
    const res = await fetch("/api/classes");
    const json = await res.json();
    if (json?.ok && Array.isArray(json.data)) {
        return json.data as ClassCard[];
    }
    throw new Error(json?.error ?? "Failed to fetch classes");
}

export async function createClass(input: CreateClassClientInput): Promise<ClassCard[]> {
    const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(
            json?.fields
                ? Object.values(json.fields).join("; ")
                : json?.details ?? json?.error ?? "Failed to create class",
        );
    }
    return json.data as ClassCard[];
}

export async function deleteClass(id: string): Promise<ClassCard[]> {
    const res = await fetch(`/api/classes/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (res.ok && json?.ok) {
        return json.data as ClassCard[];
    }
    throw new Error(json?.details ?? json?.error ?? "Failed to delete class");
}

export function findClassByJoinCode(
    classes: ClassCard[],
    code: string,
): ClassCard | undefined {
    return classes.find((c) => c.join_code === code);
}
