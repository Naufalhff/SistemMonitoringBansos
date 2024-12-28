// src/components/TanggalPenyaluran.jsx
import React from "react";

const TanggalPenyaluran = ({ value, onChange, error }) => {
  return (
    <div>
      <label
        htmlFor="tanggal"
        className="block text-sm font-medium text-gray-700"
      >
        Tanggal Penyaluran
      </label>
      <input
        type="date"
        id="tanggal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TanggalPenyaluran;
