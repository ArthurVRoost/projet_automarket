<?php

use App\Http\Controllers\ProfileController;
use App\Models\Car;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Home", [
        'user' => User::all(),
        'cars' => Car::with(['brand', 'fuel'])->get(),
        'auth' => [
            'user' => Auth::user()
        ]
    ]);
});
Route::get('/cars/{id}', function ($id) {
    $car = Car::with(['brand','fuel','user'])->findOrFail($id);
    return Inertia::render("Show", [
        'car' => $car,
        'auth' => [
            'user' => Auth::user()
        ]
    ]);
})->name('cars.show');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
