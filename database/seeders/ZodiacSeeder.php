<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ZodiacSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Retrieve the contents of the CSV file
        $fileContent = Storage::get('zodiacs.csv');
    
        // Convert file content into an array
        $csv = array_map('str_getcsv', explode(PHP_EOL, $fileContent));
        
        // Remove the header row (if present)
        $header = array_shift($csv);
    
        // Loop through each row in the CSV file
        foreach ($csv as $row) {
            if (count($row) < 4) {
                throw new \Exception("Invalid CSV row: " . json_encode($row));
            }
            DB::table('zodiacs')->insert([
                'id' => $row[0],
                'name' => $row[1],
                'from_date' => $row[2],
                'to_date' => $row[3],
            ]);
        }
    }
}