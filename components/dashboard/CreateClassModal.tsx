"use client";

import { useState } from "react";

export interface CreateClassData {
  name: string;
  group: string;
  generation: string;
  status: "active" | "inactive" | "archived";
}

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateClassData) => void;
}

// Generate initials from class name
const getInitials = (name: string): string => {
  if (!name.trim()) return "?";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

// Generate a color based on the name
const getColorFromName = (name: string): string => {
  const colors = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-green-600",
    "bg-orange-600",
    "bg-red-600",
    "bg-indigo-600",
    "bg-teal-600",
    "bg-pink-600",
  ];
  if (!name.trim()) return colors[0];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function CreateClassModal({
  isOpen,
  onClose,
  onCreate,
}: CreateClassModalProps) {
  const [formData, setFormData] = useState<CreateClassData>({
    name: "",
    group: "",
    generation: "",
    status: "active",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateClassData, string>>
  >({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateClassData, string>> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Class name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Class name must be at least 3 characters";
    }
    if (!formData.group.trim()) {
      newErrors.group = "Group is required";
    }
    if (!formData.generation.trim()) {
      newErrors.generation = "Generation is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onCreate({
      ...formData,
      name: formData.name.trim(),
      group: formData.group.trim(),
      generation: formData.generation.trim(),
    });

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      group: "",
      generation: "",
      status: "active",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateClassData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Create a New Class
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-slate-500 text-sm mb-6">
          Fill in the details below to create a new class. A unique join code
          will be generated automatically.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Class Preview */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div
              className={`w-16 h-16 rounded-lg ${getColorFromName(formData.name)} flex items-center justify-center text-white text-xl font-bold shadow-md transition-colors`}
            >
              {getInitials(formData.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-500">Preview</p>
              <p className="font-semibold text-slate-900 truncate">
                {formData.name || "Class Name"}
              </p>
            </div>
          </div>

          {/* Class Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Class Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Introduction to Programming"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${
                errors.name ? "border-red-500" : "border-slate-300"
              }`}
              autoFocus
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Group */}
          <div>
            <label
              htmlFor="group"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Group <span className="text-red-500">*</span>
            </label>
            <input
              id="group"
              name="group"
              type="text"
              value={formData.group}
              onChange={handleChange}
              placeholder="e.g., Group A"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${
                errors.group ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.group && (
              <p className="text-red-500 text-sm mt-1">{errors.group}</p>
            )}
          </div>

          {/* Generation */}
          <div>
            <label
              htmlFor="generation"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Generation <span className="text-red-500">*</span>
            </label>
            <input
              id="generation"
              name="generation"
              type="text"
              value={formData.generation}
              onChange={handleChange}
              placeholder="e.g., 2026"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${
                errors.generation ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.generation && (
              <p className="text-red-500 text-sm mt-1">{errors.generation}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
