<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "gym".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'gym'),

    'flavors' => array (
  'gym' => 
  array (
    'label' => 'Gym & Fitness',
    'brand_name' => 'OTOTKU',
    'brand_tagline' => 'Kelola gym & member',
    'brand_initials' => 'GY',
    'accent' => '#164e63',
    'category' => 'jasa',
    'home' => 'gym.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Gym',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/gym',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Member',
              'to' => '/gym/member',
              'icon' => 'Users',
            ),
            2 => 
            array (
              'label' => 'Jadwal Kelas',
              'to' => '/gym/kelas',
              'icon' => 'CalendarDays',
            ),
            3 => 
            array (
              'label' => 'Trainer',
              'to' => '/gym/trainer',
              'icon' => 'Dumbbell',
            ),
            4 => 
            array (
              'label' => 'Pembayaran',
              'to' => '/gym/pembayaran',
              'icon' => 'Wallet',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/gym/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
