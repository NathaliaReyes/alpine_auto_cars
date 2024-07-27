import React from 'react';

export function Textarea({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea className="mt-1 block w-full px-3 py-2 border rounded-md" {...props} />
    </div>
  );
}