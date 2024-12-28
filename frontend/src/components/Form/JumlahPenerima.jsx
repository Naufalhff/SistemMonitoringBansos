// src/components/JumlahPenerima.jsx
import React from "react";

const JumlahPenerima = ({ value, onChange, error }) => {
  return (
    <div>
      <label
        htmlFor="jumlah"
        className="block text-sm font-medium text-gray-700"
      >
        Jumlah Penerima Bantuan
      </label>
      <input
        type="number"
        id="jumlah"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default JumlahPenerima;
