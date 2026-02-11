// src/data/mockData.ts
import type { User } from "@/types/user";
import type { Class } from "@/types/class";
import type { Enrollment } from "@/types/enrollment";
import type { Assessment } from "@/types/assessment";
import type { Submission } from "@/types/submission";

// --- Users ---
export const users: User[] = [
  {
    user_id: 1,
    first_name: "Alice",
    last_name: "Smith",
    gender: "female",
    phone_number: "1234567890",
    email: "alice@example.com",
    password: "hashedpassword",
    profile_picture_url: "",
    is_verified: true,
    is_two_factor_enable: false,
    dob: new Date("2000-01-01"),
  },
  {
    user_id: 2,
    first_name: "Bob",
    last_name: "Johnson",
    gender: "male",
    phone_number: "0987654321",
    email: "bob@example.com",
    password: "hashedpassword",
    profile_picture_url: "",
    is_verified: true,
    is_two_factor_enable: false,
    dob: new Date("1999-05-15"),
  },
];

// --- Classes ---
export const classes: Class[] = [
  {
    class_id: 101,
    name: "Web Dev 2026",
    group: "A",
    generation: "2026",
    description: "Modern web development class.",
    join_code: "WEB2026A",
    owner_id: 1,
    cover_image_url: "",
    status: "active",
  },
  {
    class_id: 102,
    name: "AI Fundamentals",
    group: "B",
    generation: "2026",
    description: "Intro to AI and ML.",
    join_code: "AI2026B",
    owner_id: 2,
    cover_image_url: "",
    status: "active",
  },
];

// --- Enrollments ---
export const enrollments: Enrollment[] = [
  { class_id: 101, user_id: 1, role: "owner" },
  { class_id: 101, user_id: 2, role: "student" },
  { class_id: 102, user_id: 2, role: "owner" },
  { class_id: 102, user_id: 1, role: "student" },
];

// --- Assessments ---
export const assessments: Assessment[] = [
  {
    assessment_id: 1001,
    class_id: 101,
    ai_model_id: 0,
    title: "Portfolio Website",
    instruction: "Build and deploy a personal portfolio website.",
    start_date: new Date("2026-02-01"),
    end_date: new Date("2026-02-20"),
    max_score: 100,
    submission_type: "github_zip",
    allow_late: false,
    evaluation_criteria: "Design, Functionality, Code Quality",
    ai_evaluation_enable: false,
    allowTeamSubmission: false,
  },
  {
    assessment_id: 1002,
    class_id: 102,
    ai_model_id: 0,
    title: "AI Project",
    instruction: "Submit a simple AI project.",
    start_date: new Date("2026-02-05"),
    end_date: new Date("2026-02-25"),
    max_score: 100,
    submission_type: "github_zip",
    allow_late: true,
    evaluation_criteria: "Innovation, Results, Code Quality",
    ai_evaluation_enable: false,
    allowTeamSubmission: true,
  },
];

// --- Submissions ---
export const submissions: Submission[] = [
  {
    submission_id: 5001,
    user_id: 2,
    assessment_id: 1001,
    submission_time: new Date("2026-02-19T20:00:00Z"),
    status: "submitted",
  },
  {
    submission_id: 5002,
    user_id: 1,
    assessment_id: 1002,
    submission_time: new Date("2026-02-24T18:00:00Z"),
    status: "submitted",
  },
];
