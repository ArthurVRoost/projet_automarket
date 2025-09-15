<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::insert([
            [
                'name' => 'Audi',
                'logo_path' => 'storage/logo/Audi.png'
            ],
            [
                'name' => 'BMW',
                'logo_path' => 'storage/logo/Bmw.png'
            ],
            [
                'name' => 'Mercedes',
                'logo_path' => 'storage/logo/Merco.png'
            ],
            [
                'name' => 'Porsche',
                'logo_path' => 'storage/logo/Porsche.png'
            ],
            [
                'name' => 'Tesla',
                'logo_path' => 'storage/logo/Tesla.png'
            ],
        ]);
    }
}
