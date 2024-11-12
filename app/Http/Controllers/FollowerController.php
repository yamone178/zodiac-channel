<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Http\Requests\StoreFollowerRequest;
use App\Http\Requests\UpdateFollowerRequest;
use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FollowerController extends Controller
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
    public function create()
    {
        $userId = Auth::id();

        

        
        $friends = Account::with(['zodiac'])
                -> where('id', '!=', $userId)
                ->whereNotIn('id', function($query) use ($userId){
                    $query->select('following_id')
                            ->from('followers')
                            ->where('account_id', $userId);
                })->with(['zodiac'])
                 ->get();

    //        foreach($mates as $mate)
    //    {
    //      $status = auth()->user()->followings()->where('following_id',$mate->id)->exists() ;
    //      $mate->isFollowing = $status;

    //    }
        
            
      


  
       
        return Inertia::render('Followers/ZodiacMates', ['friends'=> $friends]);
    }

    public function follow($id)
    {
       
        $follower = auth()->user();

        $follower->followings()->attach($id);



        

        return back();

    }

    public function unfollow($id)
    {
        $follower = auth()->user();

        $follower->followings()->detach($id);

        return back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $follow = new Follower();

        $follow->account_id = $request['account_id'];
        $follow->following_id = $request['following_id'];
        $follow->save();

    
        return redirect()->route('zodiac-mate',['added'=> true]);

         
    }

    /**
     * Display the specified resource.
     */
    public function show(Follower $follower)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Follower $follower)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFollowerRequest $request, Follower $follower)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Follower $follower)
    {
        //
    }
}
