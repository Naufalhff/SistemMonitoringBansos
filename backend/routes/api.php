<?php

use App\Http\Controllers\LaporanController;
use Illuminate\Support\Facades\Route;

// Rute untuk menampilkan semua laporan
Route::middleware('api')->get('/laporan', [LaporanController::class, 'tampilkanSemuaLaporan']);

// Rute untuk submit laporan
Route::middleware('api')->post('/laporan', [LaporanController::class, 'submitLaporan']);

// Rute untuk verifikasi laporan, menggunakan PUT karena kita mengupdate status
Route::middleware('api')->put('/laporan/{id}/verifikasi', [LaporanController::class, 'verifikasiLaporan']);

// Rute untuk melihat detail laporan
Route::middleware('api')->get('/laporan/{id}', [LaporanController::class, 'lihatDetailLaporan']);

// Rute untuk menghapus laporan
Route::middleware('api')->delete('/laporan/{id}', [LaporanController::class, 'hapusLaporan']);

Route::middleware('api')->put('/laporan/{id}/edit', [LaporanController::class, 'editLaporan']);

// Rute untuk statistik monitoring
Route::middleware('api')->get('/statistik', [LaporanController::class, 'statistikMonitoring']);


