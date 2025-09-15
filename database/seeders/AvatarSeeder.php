<?php

namespace Database\Seeders;

use App\Models\Avatar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvatarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Avatar::insert([
            [
                'avatar_path' => 'storage/avatar/user.png',
                'user_id' => 1
            ]
        ]);
    }
}
