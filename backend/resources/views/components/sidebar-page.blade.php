<!-- resources/views/components/SidebarPage.blade.php -->
<div class="w-64 min-h-screen bg-white border-r border-gray-200 px-4 py-6">
    <!-- Logo -->
    <div class="flex items-center gap-2 px-2 mb-8">
        <div class="bg-blue-600 text-white p-2 rounded">
            <i class="fas fa-credit-card text-white"></i>
        </div>
        <span class="text-xl font-bold">Monitoring Bansos</span>
    </div>

    <!-- Navigation Menu -->
    <nav class="space-y-1">
        @php
            $menuItems = [
                ['icon' => 'fas fa-chart-line', 'text' => 'Dashboard', 'path' => route('dashboard')],
                ['icon' => 'fas fa-file-alt', 'text' => 'Form Laporan', 'path' => route('form.laporan')],
                ['icon' => 'fas fa-list', 'text' => 'Daftar Laporan', 'path' => route('daftar.laporan')],
                ['icon' => 'fas fa-check-circle', 'text' => 'Verifikasi', 'path' => route('verifikasi')],
            ];
            $currentPath = request()->url();
        @endphp

        @foreach ($menuItems as $item)
            <a href="{{ $item['path'] }}"
                class="flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors {{ $currentPath === $item['path'] ? 'bg-blue-600 text-white' : 'hover:bg-gray-100' }}">
                <i class="{{ $item['icon'] }} text-lg"></i>
                <span class="ml-3 text-sm font-medium">
                    {{ $item['text'] }}
                </span>
            </a>
        @endforeach
    </nav>
</div>