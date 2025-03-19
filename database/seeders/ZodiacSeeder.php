<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ZodiacSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Path to the CSV file stored in the storage/app directory
        $file = storage_path('app/zodiacs.csv');
        // Open and read the CSV file
        $csv = array_map('str_getcsv', file($file));
        // Remove the header row (if present)
        $header = array_shift($csv);

        // Loop through each row in the CSV file
        foreach ($csv as $row) {
            DB::table('zodiacs')->insert([
                'id' => $row[0],
                'name' => $row[1],
                'from_date' => $row[2],  
                'to_date' => $row[3],
            ]);
        }
    }
}
