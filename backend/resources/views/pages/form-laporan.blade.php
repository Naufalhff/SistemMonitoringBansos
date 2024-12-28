@extends('layouts.app')

@section('content')
<div class="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-4xl font-bold mb-4 text-gray-700">Form Laporan</h1>

    <form action="{{ route('laporan.submit') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        @csrf

        <!-- Nama Program -->
        <div>
            <label for="program" class="block text-sm font-medium text-gray-700">Nama Program</label>
            <select name="nama_program" id="program"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>Pilih Program</option>
                @foreach (['PKH', 'BLT', 'Bansos'] as $program)
                    <option value="{{ $program }}" {{ old('nama_program') == $program ? 'selected' : '' }}>
                        {{ $program }}
                    </option>
                @endforeach
            </select>
            @error('nama_program')
                <p class="text-red-500 text-sm">{{ $message }}</p>
            @enderror
        </div>

        <!-- Jumlah Penerima Bantuan -->
        <div>
            <label for="jumlah" class="block text-sm font-medium text-gray-700">Jumlah Penerima Bantuan</label>
            <input type="number" name="jumlah_penerima" id="jumlah" value="{{ old('jumlah_penerima') }} "
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            @error('jumlah_penerima')
                <p class="text-red-500 text-sm">{{ $message }}</p>
            @enderror
        </div>

        <!-- Wilayah -->
        <div>
            <label for="wilayah" class="block text-sm font-medium text-gray-700">Wilayah</label>
            <div class="flex space-x-2">
                <select name="provinsi" id="provinsi"
                    class="block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="" disabled>Pilih Provinsi</option>
                    @foreach (['Jawa Barat', 'Jawa Tengah', 'Jawa Timur'] as $provinsi)
                        <option value="{{ $provinsi }}" {{ old('provinsi') == $provinsi ? 'selected' : '' }}>
                            {{ $provinsi }}
                        </option>
                    @endforeach
                </select>
                <select name="kabupaten" id="kabupaten"
                    class="block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="" disabled>Pilih Kabupaten</option>
                    <option value="Kabupaten 1" {{ old('kabupaten') == 'Kabupaten 1' ? 'selected' : '' }}>Kabupaten 1
                    </option>
                    <option value="Kabupaten 2" {{ old('kabupaten') == 'Kabupaten 2' ? 'selected' : '' }}>Kabupaten 2
                    </option>
                </select>
                <select name="kecamatan" id="kecamatan"
                    class="block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="" disabled>Pilih Kecamatan</option>
                </select>
            </div>
            @error('provinsi')
                <p class="text-red-500 text-sm">{{ $message }}</p>
            @enderror
            @error('kabupaten')
                <p class="text-red-500 text-sm">{{ $message }}</p>
            @enderror
            @error('kecamatan')
                <p class="text-red-500 text-sm">{{ $message }}</p>
            @enderror
        </div>

        <!-- Tanggal Penyaluran -->
        <div>
            <label for="tanggal" class="block text-sm font-medium text-gray-700">Tanggal Penyaluran</label>
            <input type="date" name="tanggal_penyaluran" id="tanggal" value="{{ old('tanggal_penyaluran') }} "
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            @error('tanggal_penyaluran')
                <p class="text-red-500 text-sm">{{ $message }}</p>
            @enderror
        </div>

        <!-- Bukti Penyaluran -->
        <div>
            <label for="bukti" class="block text-sm font-medium text-gray-700">Bukti Penyaluran</label>
            <input type="file" name="bukti_penyaluran" id="bukti"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            @error('bukti_penyaluran')
                <p class="text-red-500 text-sm">{{ $message }}</p>
            @enderror
        </div>

        <!-- Catatan Tambahan -->
        <div>
            <label for="catatan" class="block text-sm font-medium text-gray-700">Catatan Tambahan</label>
            <textarea name="catatan" id="catatan" rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">{{ old('catatan') }}</textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit"
            class="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Kirim Laporan
        </button>
    </form>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Ambil data Provinsi dari API
        const provinsiSelect = document.getElementById('provinsi');
        const kabupatenSelect = document.getElementById('kabupaten');
        const kecamatanSelect = document.getElementById('kecamatan');

        // Fungsi untuk mendapatkan data kabupaten berdasarkan provinsi
        provinsiSelect.addEventListener('change', function () {
            const provinsi = provinsiSelect.value;

            if (provinsi) {
                fetch(`https://api.binderbyte.com/wilayah/provinsi/${provinsi}/kabupaten`)
                    .then(response => response.json())
                    .then(data => {
                        kabupatenSelect.innerHTML = '<option value="" disabled>Pilih Kabupaten</option>'; // Reset kabupaten
                        data.forEach(kabupaten => {
                            const option = document.createElement('option');
                            option.value = kabupaten.kabupaten;
                            option.textContent = kabupaten.kabupaten;
                            kabupatenSelect.appendChild(option);
                        });
                    });
            }
        });

        // Fungsi untuk mendapatkan data kecamatan berdasarkan kabupaten
        kabupatenSelect.addEventListener('change', function () {
            const kabupaten = kabupatenSelect.value;

            if (kabupaten) {
                fetch(`https://api.binderbyte.com/wilayah/kabupaten/${kabupaten}/kecamatan`)
                    .then(response => response.json())
                    .then(data => {
                        kecamatanSelect.innerHTML = '<option value="" disabled>Pilih Kecamatan</option>'; // Reset kecamatan
                        data.forEach(kecamatan => {
                            const option = document.createElement('option');
                            option.value = kecamatan.kecamatan;
                            option.textContent = kecamatan.kecamatan;
                            kecamatanSelect.appendChild(option);
                        });
                    });
            }
        });
    });
</script>
@endsection