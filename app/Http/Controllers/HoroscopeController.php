<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class HoroscopeController extends Controller
{
    public function index()
    {
        try {
            $response = Http::get("https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily", [
                'sign' => 'virgo',
                'day' => 'TODAY'
            ]);

            // Check if the request was successful
            if ($response->successful()) {
                
                 $result =  $response->json();

               
                 return Inertia::render('Horoscope/Index', ['result'=>$result['data']]);
            }

            return response()->json(['error' => 'Failed to fetch horoscope data'], 500);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
     

    }
}
