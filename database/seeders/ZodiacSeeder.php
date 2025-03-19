<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ZodiacSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the correct file path
        $filePath = storage_path('app/zodiacs.csv');

        // Check if the file exists before reading
        if (!file_exists($filePath)) {
            Log::error("CSV file not found: " . $filePath);
            throw new \Exception("CSV file not found: " . $filePath);
        }

        // Read file contents
        $fileContent = file_get_contents($filePath);

        // Convert file content into an array
        $csv = array_map('str_getcsv', explode("\n", rtrim($fileContent)));

        // Ensure CSV is not empty
        if (empty($csv)) {
            Log::error("CSV file is empty.");
            throw new \Exception("CSV file is empty.");
        }

        // Remove the header row (if present)
        $header = array_shift($csv);

        // Validate header structure (optional, adjust as needed)
        if ($header !== ['id', 'name', 'from_date', 'to_date']) {
            Log::error("CSV header mismatch: " . json_encode($header));
            throw new \Exception("CSV header mismatch: " . json_encode($header));
        }

        // Loop through each row in the CSV file
        foreach ($csv as $row) {
            if (count($row) < 4) {
                Log::error("Invalid CSV row: " . json_encode($row));
                throw new \Exception("Invalid CSV row: " . json_encode($row));
            }

            DB::table('zodiacs')->insert([
                'id' => $row[0],
                'name' => $row[1],
                'from_date' => $row[2],
                'to_date' => $row[3],
            ]);
        }

        Log::info("ZodiacSeeder completed successfully.");
    }
}