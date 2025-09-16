<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function create(){
        return Inertia::render('CreateBrand', [
        'auth' => [
            'user' => auth()->user()
        ]
    ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048', 
        ]);

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public');
        }

        Brand::create([
            'name' => $request->name,
            'logo_path' => $logoPath,
        ]);

        return Inertia::location(route('homepage'));
    }
}
