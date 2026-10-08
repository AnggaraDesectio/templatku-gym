<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\GymData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman Gym & Fitness (Inertia). */
class GymController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('gym/index', [
            'ringkasan'  => GymData::ringkasan(),
            'chart'      => GymData::kunjunganPerHari(),
            'members'    => array_slice(array_reverse(GymData::members()), 0, 6),
        ]);
    }

    public function member(): Response
    {
        return Inertia::render('gym/member', [
            'members' => GymData::members(),
        ]);
    }

    public function kelas(): Response
    {
        return Inertia::render('gym/kelas', [
            'kelases' => GymData::kelases(),
        ]);
    }

    public function trainer(): Response
    {
        return Inertia::render('gym/trainer', [
            'trainers' => GymData::trainers(),
        ]);
    }

    public function pembayaran(): Response
    {
        return Inertia::render('gym/pembayaran', [
            'pembayarans' => GymData::pembayarans(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('gym/laporan', [
            'ringkasan'   => GymData::ringkasan(),
            'kunjungan'   => GymData::kunjunganPerHari(),
            'distribusi'  => GymData::distribusiPaket(),
            'perBulan'    => GymData::omzetPerBulan(),
            'leaderboard' => GymData::trainerLeaderboard(),
        ]);
    }
}
