<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitoring Bansos</title>
    <!-- Include CSS dan FontAwesome -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>

<body class="bg-gray-100">
    <div class="flex">
        <!-- Sidebar -->
        <x-sidebar-page /> <!-- Ini komponen sidebar kamu -->

        <!-- Main Content -->
        <div class="flex-1 p-6">
            @yield('content') <!-- Bagian untuk konten halaman yang dinamis -->
        </div>
    </div>
</body>

</html>