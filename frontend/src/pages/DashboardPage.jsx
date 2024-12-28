import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/statistik");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );

  // Process data for the pie chart
  const programData = data?.penerima_per_program.map((item) => ({
    name: item.nama_program,
    value: item.total_penerima,
  }));

  // Process data for the bar chart
  const provinsiData = data?.penyaluran_per_wilayah.reduce((acc, item) => {
    const existingProvince = acc.find((p) => p.provinsi === item.provinsi);
    if (existingProvince) {
      existingProvince.total_penyaluran += item.total_penyaluran;
    } else {
      acc.push({
        provinsi: item.provinsi,
        total_penyaluran: item.total_penyaluran,
      });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard Monitoring Bantuan
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold">{data?.total_laporan}</div>
            <div className="text-sm text-gray-500">Total Laporan Masuk</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold">
              {data?.penerima_per_program.reduce(
                (acc, curr) => acc + curr.total_penerima,
                0
              )}
            </div>
            <div className="text-sm text-gray-500">Total Penerima Bantuan</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold">
              {data?.penyaluran_per_wilayah.length}
            </div>
            <div className="text-sm text-gray-500">
              Total Wilayah Tersalurkan
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Program Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Distribusi Penerima per Program
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {programData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Distribution Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Penyaluran per Provinsi
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={provinsiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="provinsi"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total_penyaluran" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
