// src/components/ProgramSelect.jsx
import React from "react";

const ProgramSelect = ({ value, onChange, error }) => {
  const programOptions = ["PKH", "BLT", "Bansos"];
  return (
    <div>
      <label
        htmlFor="program"
        className="block text-sm font-medium text-gray-700"
      >
        Nama Program
      </label>
      <select
        id="program"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Pilih Program
        </option>
        {programOptions.map((program) => (
          <option key={program} value={program}>
            {program}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ProgramSelect;
