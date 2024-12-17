<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Follower;
use App\Models\Post;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function view($id)
    {
     

        if (Auth::id() == $id) {
            
           return redirect()->route('profile.view');
        }
       
        $account = Account::where('id', $id)
                ->with(['zodiac', 'followers', 'followings', 'expert','normalUser'])
                ->first();
        
                

        $posts = Post::where('account_id', $id)
        ->with(['zodiacs', 'account', 'likes', 'comments', 'account.normalUser', 'account.expert'])
        ->latest()
        ->get();

        $follow = Follower::where('account_id', Auth::id())
                    ->where('following_id', $id)->exists();

       
        if ($account && $account->role == 'expert') {
            $account->expert->profile_picture_url = asset('storage/images/' . $account->expert->profile_picture);
        }

        if ($account && $account->role == 'user') {
            $account->normalUser->profile_picture_url = asset('storage/images/' . $account->normalUser->profile_picture);
        }

        $processedPosts = $posts->map(function ($post) {
            return Post::passProfileImage($post); // Return the processed post
        });

        $reviews = Review::with(['expert','user.account'])
                    ->latest()->get();

        
        $processedReviews = $reviews->map(function ($review) {
            $pathInfo = pathinfo($review->user->profile_picture);
            //dd($pathInfo);
            $filename = $pathInfo['basename'];
            // dd($review->user->profile_picture);
            $review->user->profile_picture_url = asset('storage/images/' .$filename);
            return $review;
        });

      

        return Inertia::render('Profile/ViewAccount',
         ['pfAccount'=> $account,
         'posts'=> $processedPosts,
        'follow' => $follow,
        'reviews' => $processedReviews
        ]);
    }
}
