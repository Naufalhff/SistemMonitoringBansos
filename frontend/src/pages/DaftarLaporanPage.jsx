import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenIcon, Trash2Icon } from "lucide-react";

const DaftarLaporan = () => {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterProgram, setFilterProgram] = useState(""); // State untuk program yang dipilih
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      selesai: "bg-green-100 text-green-800 border-green-200",
      ditolak: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      statusClasses[status?.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/laporan/");
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setLaporan(data.data);
        } else if (Array.isArray(data)) {
          setLaporan(data);
        } else {
          throw new Error("Data yang diterima bukan array");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, []);

  const handleHapus = async (id) => {
    const laporanToDelete = laporan.find((lapor) => lapor.id === id);

    if (
      ["disetujui", "ditolak"].includes(laporanToDelete.status.toLowerCase())
    ) {
      alert("Laporan yang sudah disetujui atau ditolak tidak dapat dihapus.");
      return;
    }

    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus laporan ini?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/api/laporan/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus laporan");
      }

      setLaporan((prevLaporan) =>
        prevLaporan.filter((lapor) => lapor.id !== id)
      );
      alert("Laporan berhasil dihapus.");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert(error.message);
    }
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  // Ambil daftar nama program unik untuk dropdown
  const programList = [...new Set(laporan.map((lapor) => lapor.nama_program))];

  // Filter data berdasarkan program yang dipilih
  const filteredLaporan = filterProgram
    ? laporan.filter((lapor) => lapor.nama_program === filterProgram)
    : laporan;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredLaporan.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredLaporan.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-red-500 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Laporan</h1>
        <select
          className="px-4 py-2 border rounded-lg"
          value={filterProgram}
          onChange={(e) => {
            setFilterProgram(e.target.value);
            setCurrentPage(1); // Reset ke halaman pertama
          }}
        >
          <option value="">Semua Program</option>
          {programList.map((program, index) => (
            <option key={index} value={program}>
              {program}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah Penerima
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provinsi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Penyaluran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((lapor, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lapor.nama_program}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lapor.jumlah_penerima}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lapor.provinsi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatTanggal(lapor.tanggal_penyaluran)}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(
                      lapor.status
                    )}`}
                  >
                    {lapor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Tombol Edit */}
                  {["pending"].includes(lapor.status.toLowerCase()) && (
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => navigate(`/edit-laporan/${lapor.id}`)}
                    >
                      {<PenIcon size={16} />}
                    </button>
                  )}
                  {/* Tombol Hapus */}
                  <button
                    className="ml-2 text-red-500 hover:underline"
                    onClick={() => handleHapus(lapor.id)}
                  >
                    {<Trash2Icon size={16} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DaftarLaporan;
