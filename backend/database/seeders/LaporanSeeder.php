<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LaporanSeeder extends Seeder
{
    public function run()
    {
        DB::table('laporans')->insert([
            [
                'nama_program' => 'PKH',
                'jumlah_penerima' => 100,
                'provinsi' => 'Jawa Barat',
                'kabupaten' => 'Bandung',
                'kecamatan' => 'Cileunyi',
                'tanggal_penyaluran' => '2024-01-01',
                'bukti_penyaluran' => 'bukti/pkh_bandung_2024.pdf',
                'catatan' => 'Penyaluran lancar.',
                'status' => 'Pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_program' => 'BLT',
                'jumlah_penerima' => 50,
                'provinsi' => 'Jawa Tengah',
                'kabupaten' => 'Semarang',
                'kecamatan' => 'Ungaran',
                'tanggal_penyaluran' => '2024-01-15',
                'bukti_penyaluran' => 'bukti/blt_semarang_2024.pdf',
                'catatan' => null,
                'status' => 'Disetujui',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_program' => 'Bansos',
                'jumlah_penerima' => 200,
                'provinsi' => 'DKI Jakarta',
                'kabupaten' => 'Jakarta Selatan',
                'kecamatan' => 'Tebet',
                'tanggal_penyaluran' => '2024-02-01',
                'bukti_penyaluran' => 'bukti/bansos_jakarta_2024.jpg',
                'catatan' => 'Terdapat keluhan terkait data penerima.',
                'status' => 'Ditolak',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

