<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Laporan;
use Illuminate\Support\Facades\DB;

class LaporanController extends Controller
{
    public function tampilkanSemuaLaporan()
    {
        // Ambil semua laporan dengan data yang dibutuhkan
        $laporan = Laporan::select('id', 'nama_program', 'jumlah_penerima', 'provinsi', 'kecamatan', 'kabupaten', 'tanggal_penyaluran', 'status')
            ->get();

        // Jika tidak ada laporan
        if ($laporan->isEmpty()) {
            return response()->json(['message' => 'Tidak ada laporan tersedia'], 404);
        }

        return response()->json([
            'data' => $laporan
        ]);
    }

    // Endpoint untuk submit laporan
    public function submitLaporan(Request $request)
    {
        $request->validate([
            'nama_program' => 'required|string',
            'jumlah_penerima' => 'required|integer|min:1',
            'provinsi' => 'required|string',
            'kabupaten' => 'required|string',
            'kecamatan' => 'required|string',
            'tanggal_penyaluran' => 'required|date',
            'bukti_penyaluran' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'catatan' => 'nullable|string',
        ]);

        // Menyimpan file bukti penyaluran
        $buktiPath = $request->file('bukti_penyaluran')->store('bukti', 'public');

        // Membuat laporan baru
        $laporan = Laporan::create([
            'nama_program' => $request->nama_program,
            'jumlah_penerima' => $request->jumlah_penerima,
            'provinsi' => $request->provinsi,
            'kabupaten' => $request->kabupaten,
            'kecamatan' => $request->kecamatan,
            'tanggal_penyaluran' => $request->tanggal_penyaluran,
            'bukti_penyaluran' => $buktiPath,
            'catatan' => $request->catatan,
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Laporan berhasil disubmit',
            'data' => $laporan,
        ], 201);
    }

    // Endpoint untuk verifikasi laporan
    public function verifikasiLaporan(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Disetujui,Ditolak',
        ]);

        $laporan = Laporan::findOrFail($id);

        // Pastikan hanya laporan dengan status "Pending" yang bisa diverifikasi
        if ($laporan->status !== 'Pending') {
            return response()->json([
                'message' => 'Laporan sudah diverifikasi atau tidak dalam status Pending',
            ], 400);
        }

        // Update status laporan
        $laporan->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Laporan berhasil diverifikasi',
            'laporan' => $laporan,
        ]);
    }

    // Endpoint untuk melihat detail laporan
    public function lihatDetailLaporan($id)
    {
        // Mencari laporan berdasarkan ID
        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Laporan tidak ditemukan',
            ], 404);
        }

        // Mengembalikan data laporan tanpa pembungkus
        return response()->json($laporan);
    }

    // Endpoint untuk menghapus laporan
    public function hapusLaporan($id)
    {
        // Mencari laporan berdasarkan ID
        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Laporan tidak ditemukan',
            ], 404);
        }

        // Menghapus laporan
        $laporan->delete();

        return response()->json([
            'message' => 'Laporan berhasil dihapus',
        ]);
    }

    // Endpoint untuk statistik monitoring
    public function statistikMonitoring()
    {
        // Menghitung total laporan
        $totalLaporan = Laporan::count();

        // Menjumlahkan penerima per program
        $penerimaPerProgram = Laporan::select('nama_program', DB::raw('SUM(jumlah_penerima) as total_penerima'))
            ->groupBy('nama_program')
            ->get();

        // Menghitung penyaluran per wilayah (provinsi, kabupaten, kecamatan)
        $penyaluranPerWilayah = Laporan::select('provinsi', 'kabupaten', 'kecamatan', DB::raw('COUNT(*) as total_penyaluran'))
            ->groupBy('provinsi', 'kabupaten', 'kecamatan')
            ->get();

        return response()->json([
            'total_laporan' => $totalLaporan,
            'penerima_per_program' => $penerimaPerProgram,
            'penyaluran_per_wilayah' => $penyaluranPerWilayah,
        ]);
    }

    // Endpoint untuk edit laporan
    public function editLaporan(Request $request, $id)
    {
        // Validasi input
        $request->validate([
            'nama_program' => 'nullable|string',
            'jumlah_penerima' => 'nullable|integer|min:1',
            'provinsi' => 'nullable|string',
            'kabupaten' => 'nullable|string',
            'kecamatan' => 'nullable|string',
            'tanggal_penyaluran' => 'nullable|date',
            'bukti_penyaluran' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'catatan' => 'nullable|string',
            'status' => 'nullable|in:Pending,Disetujui,Ditolak',
        ]);

        // Cari laporan berdasarkan ID
        $laporan = Laporan::find($id);

        if (!$laporan) {
            return response()->json([
                'message' => 'Laporan tidak ditemukan',
            ], 404);
        }

        // Jika ada file bukti penyaluran baru, simpan dan hapus file lama
        if ($request->hasFile('bukti_penyaluran')) {
            // Hapus file lama
            if ($laporan->bukti_penyaluran && \Storage::disk('public')->exists($laporan->bukti_penyaluran)) {
                \Storage::disk('public')->delete($laporan->bukti_penyaluran);
            }

            // Simpan file baru
            $buktiPath = $request->file('bukti_penyaluran')->store('bukti', 'public');
            $laporan->bukti_penyaluran = $buktiPath;
        }

        // Update laporan dengan data baru
        $laporan->update(array_filter($request->only([
            'nama_program',
            'jumlah_penerima',
            'provinsi',
            'kabupaten',
            'kecamatan',
            'tanggal_penyaluran',
            'catatan',
            'status',
        ])));

        return response()->json([
            'message' => 'Laporan berhasil diperbarui',
            'data' => $laporan,
        ]);
    }



}
