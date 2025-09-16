<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Mail\DemoMail;
use App\Models\Brand;
use App\Models\Car;
use App\Models\Fuel;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Home", [
        'user' => User::all(),
        'cars' => Car::with(['brand', 'fuel'])->get(),
        'brands' => Brand::all(),   
        'fuels' => Fuel::all(),     
        'auth' => [
            'user' => Auth::user()
        ]
        
    ]);
})->name('homepage');

Route::get('/mail-test', function () {
    Mail::to('avroost@gmail.com')->send(new DemoMail());
    return 'Mail envoyé.';
})->name('mail');
Route::middleware('auth')->group(function () {
    Route::get('/cars/create', [CarController::class, 'create'])->name('cars.create');
    Route::post('/cars', [CarController::class, 'store'])->name('cars.store');
    Route::delete('/cars/{car}', [CarController::class, 'destroy'])->name('cars.destroy');
});
Route::middleware(['auth', 'admin_or_modo'])->group(function () {
    Route::get('/brands/create', [BrandController::class, 'create'])->name('brands.create');
    Route::post('/brands', [BrandController::class, 'store'])->name('brands.store');
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

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::patch('/admin/users/{user}/role', [AdminController::class, 'updateUserRole'])->name('admin.update-role');
    Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser'])->name('admin.delete-user');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/test', [HomeController::class, 'index']);


   


require __DIR__.'/auth.php';
