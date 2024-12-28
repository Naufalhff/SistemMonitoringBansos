<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    use HasFactory;

    // Nama tabel di database
    protected $table = 'laporans';

    // Kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'nama_program',
        'jumlah_penerima',
        'provinsi',
        'kabupaten',
        'kecamatan',
        'tanggal_penyaluran',
        'bukti_penyaluran',
        'catatan',
        'status',
    ];

    // Kolom yang harus di-cast ke tipe tertentu
    protected $casts = [
        'tanggal_penyaluran' => 'date',
        'jumlah_penerima' => 'integer',
    ];
}
