import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailLaporan = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [laporan, setLaporan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Untuk kembali ke halaman sebelumnya

  useEffect(() => {
    const fetchLaporanDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/laporan/${id}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil detail laporan");
        }
        const data = await response.json();
        setLaporan(data); // Asumsikan data adalah objek
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporanDetail();
  }, [id]);

  const handleVerifikasi = async (status) => {
    try {
      const url = `http://localhost:8000/api/laporan/${id}/verifikasi`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate status laporan");
      }

      const data = await response.json();
      console.log("Status berhasil diperbarui:", data);

      // Pastikan 'laporan' direspons dan diperbarui
      if (data.laporan && data.laporan.status) {
        setLaporan((prevLaporan) => ({
          ...prevLaporan,
          status: data.laporan.status,
        }));
      } else {
        console.error("Properti 'status' tidak ditemukan dalam respons API.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError(error.message); // Tampilkan kesalahan di UI
    }
  };

  if (loading) {
    return <div>Memuat detail laporan...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!laporan) {
    return <div>Data laporan tidak ditemukan.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
      <button
        className="text-blue-500 hover:underline mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Kembali
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Detail Laporan ID {id}
      </h1>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Field
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Detail
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Id Laporan
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.id}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Nama Program
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.nama_program}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Jumlah Penerima
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.jumlah_penerima}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Provinsi
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.provinsi}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Kabupaten
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.kabupaten}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Kecamatan
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.kecamatan}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Tanggal Penyaluran
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.tanggal_penyaluran}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Bukti Penyaluran
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.bukti_penyaluran ? (
                  <>
                    <img
                      src={`http://localhost:8000/storage/${laporan.bukti_penyaluran}`}
                      alt="Bukti Penyaluran"
                      className="max-w-xs h-auto"
                    />
                    {/* Tombol Download */}
                    <a
                      href={`http://localhost:8000/storage/${laporan.bukti_penyaluran}`}
                      download={`bukti_penyaluran_${laporan.id}.jpg`} // Nama file saat diunduh
                      className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Download Bukti Penyaluran
                    </a>
                  </>
                ) : (
                  <span>Tidak ada bukti penyaluran</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Catatan
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.catatan}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900">
                Status
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {laporan.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tombol Setuju dan Ditolak */}
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleVerifikasi("Disetujui")}
        >
          Setuju
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
          onClick={() => handleVerifikasi("Ditolak")}
        >
          Ditolak
        </button>
      </div>
    </div>
  );
};

export default DetailLaporan;
