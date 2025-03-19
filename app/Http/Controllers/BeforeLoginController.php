<?php

namespace App\Http\Controllers;


use Inertia\Inertia;

class BeforeLoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome');
    }
}
