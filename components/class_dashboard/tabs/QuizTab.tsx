"use client";

import { ClockIcon, DocumentTextIcon } from "../icons";

interface QuizTabProps {
  classId: string;
}

/**
 * QuizTab - Quiz management and display view.
 */
export default function QuizTab({ classId }: QuizTabProps) {
  const quizzes = [
    {
      id: "1",
      title: "Mid-term Quiz",
      dueDate: "Nov 25th",
      duration: "60 minutes",
      questions: 20,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Chapter 3 Quiz",
      dueDate: "Nov 30th",
      duration: "30 minutes",
      questions: 10,
      status: "upcoming",
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {quiz.title}
                </h3>
                <p className="text-sm text-slate-500">Due: {quiz.dueDate}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {quiz.status}
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{quiz.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5" />
                <span>{quiz.questions} questions</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
