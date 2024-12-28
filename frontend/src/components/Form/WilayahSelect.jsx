import React, { useState, useEffect } from "react";

const WilayahSelect = ({
  provinsi,
  kabupaten,
  kecamatan,
  setForm,
  form,
  error,
}) => {
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kabupatenOptions, setKabupatenOptions] = useState([]);
  const [kecamatanOptions, setKecamatanOptions] = useState([]);

  // Fetch Provinsi
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => response.json())
      .then((data) => setProvinsiOptions(data))
      .catch((error) => console.error("Error fetching provinsi:", error));
  }, []);

  // Fetch Kabupaten when Provinsi changes
  useEffect(() => {
    if (form.provinsi) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${form.provinsi}.json`
      )
        .then((response) => response.json())
        .then((data) => setKabupatenOptions(data))
        .catch((error) => console.error("Error fetching kabupaten:", error));
    } else {
      setKabupatenOptions([]);
      setKecamatanOptions([]);
    }
  }, [form.provinsi]);

  // Fetch Kecamatan when Kabupaten changes
  useEffect(() => {
    if (form.kabupaten) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${form.kabupaten}.json`
      )
        .then((response) => response.json())
        .then((data) => setKecamatanOptions(data))
        .catch((error) => console.error("Error fetching kecamatan:", error));
    } else {
      setKecamatanOptions([]);
    }
  }, [form.kabupaten]);

  return (
    <div>
      <label
        htmlFor="wilayah"
        className="block text-sm font-medium text-gray-700"
      >
        Wilayah
      </label>
      <div className="flex space-x-2">
        {/* Provinsi Select */}
        <select
          id="provinsi"
          value={form.provinsi}
          onChange={(e) => {
            const selectedOption = provinsiOptions.find(
              (item) => item.id === e.target.value
            );
            setForm({
              ...form,
              provinsi: e.target.value,
              provinsiNama: selectedOption ? selectedOption.name : "",
              kabupaten: "",
              kabupatenNama: "",
              kecamatan: "",
              kecamatanNama: "",
            });
          }}
          className="block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Pilih Provinsi
          </option>
          {provinsiOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Kabupaten Select */}
        <select
          id="kabupaten"
          value={form.kabupaten}
          onChange={(e) => {
            const selectedOption = kabupatenOptions.find(
              (item) => item.id === e.target.value
            );
            setForm({
              ...form,
              kabupaten: e.target.value,
              kabupatenNama: selectedOption ? selectedOption.name : "",
              kecamatan: "",
              kecamatanNama: "",
            });
          }}
          disabled={!form.provinsi}
          className="block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Pilih Kabupaten
          </option>
          {kabupatenOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Kecamatan Select */}
        <select
          id="kecamatan"
          value={form.kecamatan}
          onChange={(e) => {
            const selectedOption = kecamatanOptions.find(
              (item) => item.id === e.target.value
            );
            setForm({
              ...form,
              kecamatan: e.target.value,
              kecamatanNama: selectedOption ? selectedOption.name : "",
            });
          }}
          disabled={!form.kabupaten}
          className="block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Pilih Kecamatan
          </option>
          {kecamatanOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default WilayahSelect;
