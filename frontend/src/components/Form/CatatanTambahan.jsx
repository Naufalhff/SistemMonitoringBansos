// src/components/Catatan.jsx
import React from "react";

const CatatanTambahan = ({ value, onChange }) => {
  return (
    <div>
      <label
        htmlFor="catatan"
        className="block text-sm font-medium text-gray-700"
      >
        Catatan Tambahan
      </label>
      <textarea
        id="catatan"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows="4"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default CatatanTambahan;
