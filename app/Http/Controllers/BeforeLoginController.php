<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BeforeLoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome');
    }
}
