import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import FormLaporan from "../pages/FormLaporanPage";
import DaftarLaporan from "../pages/DaftarLaporanPage";
import DetailLaporan from "../pages/DetailLaporanPage";
import Verifikasi from "../pages/VerifikasiPage";
import EditLaporan from "../components/Form/EditLaporan";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/form-laporan" element={<FormLaporan />} />
      <Route path="/daftar-laporan" element={<DaftarLaporan />} />
      <Route path="/daftar-laporan/:id" element={<DetailLaporan />} />
      <Route path="/verifikasi" element={<Verifikasi />} />
      <Route path="/edit-laporan/:id" element={<EditLaporan />} />
    </Routes>
  );
};

export default AppRoutes;
