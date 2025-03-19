<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Post;
use App\Models\Review;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{


    public function view()
    {
        $posts = Post::where('account_id', Auth::id())
            ->with(['zodiacs', 'account', 'likes', 'comments', 'account.normalUser', 'account.expert'])
            ->latest()
            ->get();

        $authExpertId = Auth::user()->role == 'expert' ? Auth::user()->expert->id : Auth::user()->normalUser->id;

        // dd($authExpertId);  


        $reviews = Auth::user()->role == 'expert' ? Review::where('expert_id', $authExpertId)
            ->with(['expert', 'user.account'])
            ->latest()->get() : '';

        if ($reviews) {
            $processedReviews =  $reviews->map(function ($review) {
                $pathInfo = pathinfo($review->user->profile_picture);
                //dd($pathInfo);
                $filename = $pathInfo['basename'];
                // dd($review->user->profile_picture);
                $review->user->profile_picture_url = asset('storage/images/' . $filename);
                return $review;
            });
        } else {
            $processedReviews = '';
        }
    
        $processedPosts = $posts->map(function ($post) {
            return Post::passProfileImage($post); // Return the processed post
        });
        return Inertia::render('Profile/Profile', ['posts' => $processedPosts, 'reviews' => $processedReviews]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {


        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
