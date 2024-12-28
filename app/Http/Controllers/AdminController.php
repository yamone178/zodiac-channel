<?php

namespace App\Http\Controllers;

use App\Models\Expert;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function home()
    {
        return Inertia::render('Admin/AdminHome');
    }


    public function experts()
    {
        $experts = Expert::with(['account', 'account.zodiac'])
                    ->latest()->paginate(5);

                   
        
        $processedExperts = $experts->map(function ($expert) {
            $expert->profile_picture = $expert->profile_picture ? asset('storage/images/'.$expert->profile_picture) : asset('assets/images/profile-image.jpg') ; // Ensure profile_picture is set
            return $expert;
        });


        return Inertia::render('Admin/Experts',
         [
            'experts' => $processedExperts,
             'pagination' => $experts
        ]);
    }

    public function users()
    {
        $users = User::with(['account', 'account.zodiac'])
                    ->latest()->paginate(5);

                   
        
        $processedUsers = $users->map(function ($user) {
            $user->profile_picture = $user->profile_picture ? asset('storage/images/'.$user->profile_picture) : asset('assets/images/profile-image.jpg') ; // Ensure profile_picture is set
            return $user;
        });

        
        return Inertia::render('Admin/Users',
         [
            'users' => $processedUsers,
             'pagination' => $users
        ]);
    }
}
