<?php

namespace App\Http\Controllers;

use App\Models\Expert;
use App\Http\Requests\StoreExpertRequest;
use App\Http\Requests\UpdateExpertRequest;
use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpertController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
       
        $registerData = $request->data;
       return Inertia::render('Auth/ExpertInfoForm', ['registerData'=> $registerData]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpertRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Expert $expert)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expert $expert)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpertRequest $request, Expert $expert)
    {

        $userAccount = Auth::user()->expert; //normalUser

        $user = Expert::where('id', $userAccount->id)->first();

        if($request->has('data.name')) {
            $userId = Account::where('id', Auth::id())->first(); 
         
            $userId->name = $request->data['name'];
            $userId->update();
        }

        if ($request->has('data.bio')) {
            $user->bio = $request->data['bio'];
        }

        if ($request->has('data.dob')) {
            $user->dob = $request->data['dob'];
        }
        if ($request->has('data.about_me')) {
            $user->about_me = $request->data['about_me'];
        }
        if ($request->has('data.expertise')) {
            $user->expertise = $request->data['expertise'];
        }
    
        $user->account_id = Auth::id();
        // }
        
        // Creating the Expert profile
       
        // Handling profile picture upload if provided

        $oldImage = $user->profile_picture;
        if ($request->hasFile('data.profile_picture')) {

            if ($oldImage && file_exists(public_path('images/' . $oldImage))) {
                unlink(public_path('images/' . $oldImage));
            }

            $fileName = uniqid() . $request->file('data.profile_picture')->getClientOriginalName();
            $request->file('data.profile_picture')->storeAs('public/images', $fileName);

            $user->profile_picture = $fileName; // Store the file path in the database
        }else {

            $oldImage ? $user->profile_picture = $oldImage : null;
        }

        // Saving the expert profile
        $user->update();
        return redirect()->back()->with('message','Profile Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expert $expert)
    {
        //
    }
}
