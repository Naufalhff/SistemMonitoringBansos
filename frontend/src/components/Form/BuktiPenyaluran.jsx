// src/components/BuktiPenyaluran.jsx
import React from "react";

const BuktiPenyaluran = ({ onChange, error }) => {
  return (
    <div>
      <label
        htmlFor="bukti"
        className="block text-sm font-medium text-gray-700"
      >
        Bukti Penyaluran
      </label>
      <input
        type="file"
        id="bukti"
        onChange={onChange}
        accept=".jpg, .jpeg, .png, .pdf"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default BuktiPenyaluran;
