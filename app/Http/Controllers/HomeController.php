<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    // public function index()
    // {
    //     $account = Auth::user()->load(['zodiac', 'expert', 'normalUser', 'followings']);
        
    //     // Add expert image to the expert data if the user has an expert
    //     if ($account && $account->expert) {
    //         $account->expert->profile_picture_url = asset('storage/images/' . $account->expert->profile_picture);
    //     }

    //     if ($account && $account->normalUser) {
    //         $account->normalUser->profile_picture_url = asset('storage/images/' . $account->normalUser->profile_picture);
    //     }

    //     return Inertia::render('Layouts/HomeLayout', ['account'=>$account]);

    // }

    public function approval()
    {
        $user = Auth::user();
        return Inertia::render('Approval', ['user' => $user]);  
    }
}
