<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Fuel;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CarController extends Controller
{
    
    public function create(){
        return Inertia::render('CreateCar', [
            'brands' => Brand::all(),
            'fuels' => Fuel::all()
        ]);
    }

    
    public function store(Request $request){
    $data = $request->validate([
        'brand_id' => 'required|exists:brands,id',
        'fuel_id' => 'required|exists:fuels,id',
        'model' => 'required|string|max:255',
        'etat' => 'required|in:neuf,occasion',
        'annee' => 'required|digits:4|integer',
        'kilometrage' => 'required|integer',
        'abs' => 'boolean',
        'image1_path' => 'required|file|image|max:2048',
        'image2_path' => 'nullable|file|image|max:2048',
        'image3_path' => 'nullable|file|image|max:2048',
        'image4_path' => 'nullable|file|image|max:2048',
        'jantes' => 'required|in:16,17,18,19,NONE',
        'sellerie' => 'required|in:Cuir,Tissus',
        'couleur' => 'required|string|size:7',
        'type' => 'required|in:4X4,SUV,BREAK,LUDOSPACE,VAN,BERLINE',
        'cylindree' => 'required|in:1l,1.2l,1.5l,1.8l,2l,3l,NONE',
        'prix' => 'required|numeric',
        'description' => 'required|string',
    ]);

    foreach (['image1_path', 'image2_path', 'image3_path', 'image4_path'] as $img) {
        if ($request->hasFile($img)) {
            $path = $request->file($img)->store('voitures', 'public');
            $data[$img] = 'storage/' . $path;
        }
    }

    $data['user_id'] = Auth::id();

    Car::create($data);

    return Inertia::location(route('homepage'));
}

    
    public function destroy(Car $car){
    if (!in_array(Auth::user()->role_id, [2, 3])) {
        abort(403, 'Accès refusé');
    }
    $car->delete();
    return Inertia::location(route('homepage'));
}
}