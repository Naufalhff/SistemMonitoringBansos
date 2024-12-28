import React, { useState } from "react";
import axios from "axios"; // Import axios
import ProgramSelect from "./ProgramSelect";
import JumlahPenerima from "./JumlahPenerima";
import WilayahSelect from "./WilayahSelect";
import TanggalPenyaluran from "./TanggalPenyaluran";
import BuktiPenyaluran from "./BuktiPenyaluran";
import CatatanTambahan from "./CatatanTambahan";

const FormLaporan = () => {
  const [form, setForm] = useState({
    namaProgram: "",
    jumlahPenerima: "",
    provinsi: "",
    provinsiNama: "", // Tambahkan state untuk nama provinsi
    kabupaten: "",
    kabupatenNama: "", // Tambahkan state untuk nama kabupaten
    kecamatan: "",
    kecamatanNama: "", // Tambahkan state untuk nama kecamatan
    tanggalPenyaluran: "",
    buktiPenyaluran: null,
    catatan: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFileUpload = (event) => {
    setForm({
      ...form,
      buktiPenyaluran: event.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.namaProgram) newErrors.namaProgram = "Nama program wajib diisi.";
    if (!form.jumlahPenerima)
      newErrors.jumlahPenerima = "Jumlah penerima wajib diisi.";
    if (!form.provinsi || !form.kabupaten || !form.kecamatan)
      newErrors.wilayah = "Wilayah lengkap wajib diisi.";
    if (!form.tanggalPenyaluran)
      newErrors.tanggalPenyaluran = "Tanggal penyaluran wajib diisi.";
    if (!form.buktiPenyaluran)
      newErrors.buktiPenyaluran = "Bukti penyaluran wajib diunggah.";
    else if (form.buktiPenyaluran.size > 2 * 1024 * 1024)
      newErrors.buktiPenyaluran = "Ukuran file maksimal 2MB.";
    else if (
      !["image/jpeg", "image/png", "application/pdf"].includes(
        form.buktiPenyaluran.type
      )
    )
      newErrors.buktiPenyaluran = "File harus JPG, PNG, atau PDF.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setForm({
      namaProgram: "",
      jumlahPenerima: "",
      provinsi: "",
      provinsiNama: "",
      kabupaten: "",
      kabupatenNama: "",
      kecamatan: "",
      kecamatanNama: "",
      tanggalPenyaluran: "",
      buktiPenyaluran: null,
      catatan: "",
    });
    setErrors({});
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true); // Start loading
      try {
        const formData = new FormData();
        formData.append("nama_program", form.namaProgram);
        formData.append("jumlah_penerima", form.jumlahPenerima);
        formData.append("provinsi", form.provinsiNama); // Kirim nama provinsi
        formData.append("kabupaten", form.kabupatenNama); // Kirim nama kabupaten
        formData.append("kecamatan", form.kecamatanNama); // Kirim nama kecamatan
        formData.append("tanggal_penyaluran", form.tanggalPenyaluran);
        formData.append("bukti_penyaluran", form.buktiPenyaluran); // For file upload
        formData.append("catatan", form.catatan);

        // Debug: Check the form data before sending
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const response = await axios.post(
          "http://localhost:8000/api/laporan/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );

        alert("Laporan berhasil dikirim!");
        console.log(response.data);
        resetForm(); // Reset the form after successful submission
      } catch (error) {
        console.error(
          "Error submitting the form",
          error.response ? error.response.data : error.message
        );
        alert("Terjadi kesalahan saat mengirim laporan.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-4 text-gray-700">Form Laporan</h1>
      <form onSubmit={submitForm} className="space-y-6">
        <ProgramSelect
          value={form.namaProgram}
          onChange={(value) => setForm({ ...form, namaProgram: value })}
          error={errors.namaProgram}
        />
        <JumlahPenerima
          value={form.jumlahPenerima}
          onChange={(value) => setForm({ ...form, jumlahPenerima: value })}
          error={errors.jumlahPenerima}
        />
        <WilayahSelect
          provinsi={form.provinsi}
          kabupaten={form.kabupaten}
          kecamatan={form.kecamatan}
          setForm={setForm}
          form={form}
          error={errors.wilayah}
        />

        <TanggalPenyaluran
          value={form.tanggalPenyaluran}
          onChange={(value) => setForm({ ...form, tanggalPenyaluran: value })}
          error={errors.tanggalPenyaluran}
        />
        <BuktiPenyaluran
          onChange={handleFileUpload}
          error={errors.buktiPenyaluran}
        />
        <CatatanTambahan
          value={form.catatan}
          onChange={(value) => setForm({ ...form, catatan: value })}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Mengirim..." : "Kirim Laporan"}
        </button>
      </form>
    </div>
  );
};

export default FormLaporan;
