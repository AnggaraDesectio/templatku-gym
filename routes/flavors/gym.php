<?php

use App\Http\Controllers\Web\GymController;
use Illuminate\Support\Facades\Route;

Route::prefix('gym')->name('gym.')->group(function () {
    Route::get('/', [GymController::class, 'index'])->name('index');
    Route::get('/member', [GymController::class, 'member'])->name('member');
    Route::get('/kelas', [GymController::class, 'kelas'])->name('kelas');
    Route::get('/trainer', [GymController::class, 'trainer'])->name('trainer');
    Route::get('/pembayaran', [GymController::class, 'pembayaran'])->name('pembayaran');
    Route::get('/laporan', [GymController::class, 'laporan'])->name('laporan');
});
