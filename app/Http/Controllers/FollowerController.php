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

use function PHPSTORM_META\map;

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

    // Fetch friends that are not already followed
    $friends = Account::where('role', 'user')
        ->where('id', '!=', $userId)
        ->whereNotIn('id', function ($query) use ($userId) {
            $query->select('following_id')
                ->from('followers')
                ->where('account_id', $userId);
        })
        ->with(['zodiac', 'normalUser', 'expert'])
        ->latest()
        ->get();

    

    // Process friends' profile pictures
    $processedFriends = $friends->map(function ($friend){
        return Follower::passFriendImage($friend);
    });

    // Return the data to the view
    return Inertia::render('Followers/ZodiacMates', ['friends' => $processedFriends]);
}

    public function expertFollow()
    {
        $userId = Auth::id();

        

        
        $friends = Account::where('role', 'expert')
                ->where('id', '!=', $userId)
                ->whereNotIn('id', function($query) use ($userId){
                    $query->select('following_id')
                            ->from('followers')
                            ->where('account_id', $userId);
                })->with(['zodiac', 'normalUser', 'expert' ])
                ->latest()
                 ->get();



    $processedfriends = $friends->map(function ($friend) {
        // // Process normal user profile picture
        if ($profilePicture = $friend->normalUser?->profile_picture) {
            $pathInfo = pathinfo($profilePicture);
            //dd($pathInfo);
            $filename = $pathInfo['basename'];

            $friend->normalUser->profile_picture = asset('storage/images/' . $filename);
        }
    
        // Process expert profile picture if normal user's picture is not available
        if (!$profilePicture && $expertPicture = $friend->expert?->profile_picture) {
            $pathInfo = pathinfo($expertPicture);
            //dd($pathInfo);
            $filename = $pathInfo['basename'];

            $friend->expert->profile_picture = asset('storage/images/' . $filename);
        }
        
          
        return $friend; // Return the processed post
    });
        

       
        return Inertia::render('Followers/Experts', ['friends'=> $processedfriends]);
    }

    public function follow($id)
    {
       
        $follower = auth()->user();

        $follower->followings()->attach($id);
        

        return back();

    }


    public function getZodiacsFriends()
{
    $userId = Auth::id();

    // Get followings where the following account's role is 'user'
    $followings = Follower::where('account_id', $userId)
        ->whereHas('followingAccount', function ($query) {
            $query->where('role', 'user');
        })
        ->with(['followingAccount.normalUser', 'followingAccount.zodiac', 'followingAccount.expert'])
        ->get();

    // Get followers where the follower account's role is 'user'
    $followers = Follower::where('following_id', $userId)
        ->whereHas('followerAccount', function ($query) {
            $query->where('role', 'user');
        })
        ->with(['followerAccount.normalUser', 'followerAccount.zodiac', 'followerAccount.expert'])
        ->get();

    // Process followers
    $processedFollowers = $followers->map(function ($follower) {
        return Follower::passFriendImage($follower->followerAccount);
    });

    // Process followings
    $processedFollowings = $followings->map(function ($following) {
        return Follower::passFriendImage($following->followingAccount);
    });

    // Return the data to the Inertia view
    return Inertia::render('Followers/ViewYourZodiacMates', [
        'followers' => $processedFollowers,
        'followings' => $processedFollowings,
    ]);
}

public function getExpertFriends()
{
    $userId = Auth::id();

    // Get followings where the following account's role is 'user'
    $followings = Follower::where('account_id', $userId)
        ->whereHas('followingAccount', function ($query) {
            $query->where('role', 'expert');
        })
        ->with(['followingAccount.normalUser', 'followingAccount.zodiac', 'followingAccount.expert'])
        ->get();

    // Get followers where the follower account's role is 'user'
    $followers = Follower::where('following_id', $userId)
        ->whereHas('followerAccount', function ($query) {
            $query->where('role', 'expert');
        })
        ->with(['followerAccount.normalUser', 'followerAccount.zodiac', 'followerAccount.expert'])
        ->get();

    // Process followers
    $processedFollowers = $followers->map(function ($follower) {
        return Follower::passFriendImage($follower->followerAccount);
    });

    // Process followings
    $processedFollowings = $followings->map(function ($following) {
        return Follower::passFriendImage($following->followingAccount);
    });

    // Return the data to the Inertia view
    return Inertia::render('Followers/ViewExpertFriends', [
        'followers' => $processedFollowers,
        'followings' => $processedFollowings,
    ]);
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
