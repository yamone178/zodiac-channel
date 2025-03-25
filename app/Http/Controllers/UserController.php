<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function update(Request $request)
    {   
        $userAccount = Auth::user()->normalUser; //normalUser

        $user = User::where('id', $userAccount->id)->first();

        if ($request->data['bio'] !== null) {
            $user->bio = $request->data['bio'];
        }

        if ($request->data['dob'] !== null) {
            $user->dob = $request->data['dob'];
        }
    
        $user->account_id = Auth::id();

        $oldImage = $user->profile_picture;
        if ($request->hasFile('data.profile_picture')) {

            if ($oldImage && file_exists(asset('images/' . $oldImage))) {
                unlink(asset('images/' . $oldImage));
            }

            $fileName = uniqid() . $request->file('data.profile_picture')->getClientOriginalName();
            $request->file('data.profile_picture')->storeAs('public/images', $fileName);

            $user->profile_picture = $fileName; // Store the file path in the database
        }else {

            $oldImage ? $user->profile_picture = $oldImage : null;
        }

        // Saving the expert profile
        $user->update();
        return redirect()->back()->with('message', 'Profile updated successfully');
    }
}