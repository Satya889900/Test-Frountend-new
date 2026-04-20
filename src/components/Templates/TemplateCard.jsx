import React from "react";

export default function TemplateCard({ template, onSelect }) {
  return (
    <div
      onClick={() => onSelect(template)}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 p-4 hover:scale-105"
    >
      <div className="h-40 bg-gray-100 flex items-center justify-center rounded mb-3">
        <span className="text-gray-400 text-sm">Preview</span>
      </div>

      <h3 className="font-semibold text-lg">{template.layout}</h3>
      <p className="text-sm text-gray-500">{template.type}</p>
    </div>
  );
}