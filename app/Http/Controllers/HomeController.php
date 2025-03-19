<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    
    public function approval()
    {
        $user = Auth::user();
        return Inertia::render('Approval', ['user' => $user]);  
    }
}
