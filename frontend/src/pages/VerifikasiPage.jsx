import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verifikasi = () => {
  const [laporan, setLaporan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Jumlah item per halaman
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleNextPage = () => {
    if (currentPage < Math.ceil(laporan.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
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

  // Menghitung data yang ditampilkan berdasarkan halaman
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = laporan.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Verifikasi Laporan</h1>
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
            {currentItems.map((lapor, index) => (
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
                  {formatTanggal(lapor.tanggal_penyaluran)}
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
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => navigate(`/daftar-laporan/${lapor.id}`)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Halaman {currentPage} dari {Math.ceil(laporan.length / itemsPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(laporan.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Verifikasi;
