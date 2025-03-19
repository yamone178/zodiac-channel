<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\Account::factory()->create([
        //     'name' => 'yamone',
        //     'email' => 'yamone@gmail.com',
        //     'password'=> Hash::make('admin@2025'),
        //     'role' => 'admin',
        // ]);

    

        $this->call([
            ZodiacSeeder::class,
            
        ]);
    }
}