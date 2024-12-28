<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaporanController;

Route::post('/laporan/submit', [LaporanController::class, 'submitLaporan'])->name('laporan.submit');

Route::get('/', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/form-laporan', function () {
    return view('pages.form-laporan');
})->name('form.laporan');

Route::get('/daftar-laporan', function () {
    return view('daftar-laporan');
})->name('daftar.laporan');


Route::get('/verifikasi', function () {
    return view('verifikasi');
})->name('verifikasi');


