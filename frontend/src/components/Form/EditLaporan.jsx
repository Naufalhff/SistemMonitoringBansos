import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgramSelect from "./ProgramSelect";
import JumlahPenerima from "./JumlahPenerima";
import WilayahSelect from "./WilayahSelect";
import TanggalPenyaluran from "./TanggalPenyaluran";
import BuktiPenyaluran from "./BuktiPenyaluran";
import CatatanTambahan from "./CatatanTambahan";
import { useNavigate, useParams } from "react-router-dom";

const EditLaporan = () => {
  const [form, setForm] = useState({
    namaProgram: "",
    jumlahPenerima: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    tanggalPenyaluran: "",
    buktiPenyaluran: null,
    catatan: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch report data for editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchReportData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/laporan/${id}`
          );
          const data = response.data;

          // Debug log untuk melihat data yang diterima
          console.log("Data yang diterima untuk edit:", data);

          setForm({
            namaProgram: data.nama_program,
            jumlahPenerima: data.jumlah_penerima,
            provinsi: data.provinsi,
            kabupaten: data.kabupaten,
            kecamatan: data.kecamatan,
            tanggalPenyaluran: data.tanggal_penyaluran.split("T")[0],
            buktiPenyaluran: null, // Anda bisa sesuaikan jika ingin menampilkan file
            catatan: data.catatan,
          });
        } catch (error) {
          console.error("Error fetching report data:", error);
          alert("Terjadi kesalahan saat mengambil data laporan.");
        }
      };

      fetchReportData();
    }
  }, [id]);

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
      kabupaten: "",
      kecamatan: "",
      tanggalPenyaluran: "",
      buktiPenyaluran: null,
      catatan: "",
    });
    setErrors({});
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("nama_program", form.namaProgram);
        formData.append("jumlah_penerima", form.jumlahPenerima);
        formData.append("provinsi", form.provinsi);
        formData.append("kabupaten", form.kabupaten);
        formData.append("kecamatan", form.kecamatan);
        formData.append("tanggal_penyaluran", form.tanggalPenyaluran);
        formData.append("bukti_penyaluran", form.buktiPenyaluran);
        formData.append("catatan", form.catatan);

        if (isEditMode) {
          await axios.put(
            `http://localhost:8000/api/laporan/${id}/edit`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          await axios.post("http://localhost:8000/api/laporan/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        alert(
          isEditMode
            ? "Laporan berhasil diperbarui!"
            : "Laporan berhasil dikirim!"
        );
        resetForm();
        navigate("/daftar-laporan");
      } catch (error) {
        console.error("Error submitting the form", error);
        alert("Terjadi kesalahan saat mengirim laporan.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-4 text-gray-700">
        {isEditMode ? "Edit Laporan" : "Form Laporan"}
      </h1>
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
          value={form.catatan || ""}
          onChange={(value) => setForm({ ...form, catatan: value })}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading
            ? "Mengirim..."
            : isEditMode
            ? "Perbarui Laporan"
            : "Kirim Laporan"}
        </button>
      </form>
    </div>
  );
};

export default EditLaporan;
