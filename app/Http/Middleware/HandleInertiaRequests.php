<?php

namespace App\Http\Middleware;

use App\Models\Account;
use App\Models\Expert;
use App\Models\Zodiac;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;


class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        
        $user = $request->user() ? Auth::user()->load(['zodiac', 'expert', 'normalUser','followers', 'followings']) : null;
        
        // Add expert image to the expert data if the user has an expert
        if ($user && $user->expert) {
            $user->expert->profile_picture_url = asset('storage/images/' . $user->expert->profile_picture);
        }

        if ($user && $user->normalUser) {
            $user->normalUser->profile_picture_url = asset('storage/images/' . $user->normalUser->profile_picture);
        }

        $expertSuggests = Expert::with(['account'])->inRandomOrder()->take(5)->get();

        $expertRecommends = $expertSuggests->map(function ($expert) {
            $expert->profile_picture_url =asset('storage/images/' . $expert->profile_picture) ; // Return the processed post
            return $expert;
        });
      

        return [
            ...parent::share($request),
            'query' => $request->query('query'),
            'appName' => config('app.name'),
            'auth' => [
                'user' => $user
            ],
             'globalSearchData' => fn () => [
            'query' => $request->query('query', ''),
            'searchUsers' => Account::where('name', 'LIKE', "%{$request->query('query', '')}%")
        ->with(['normalUser', 'expert']) // Load relationships
        ->get()
        ->map(function ($account) {
            // Handle expert role
            if ($account->role === 'expert' && $account->expert) {
                $account->expert->profile_picture_url = asset('storage/images/' . $account->expert->profile_picture);
            } 
            // Handle normal user role
            if ($account->role === 'user' && $account->normalUser) {
                $account->normalUser->profile_picture_url = asset('storage/images/' . optional($account->normalUser)->profile_picture);
            } 
            // // Handle default profile picture if none exists
            // else {
            //     $account->profile_picture_url = asset('assets/images/default-profile.png');
            // }

            return $account;
        }),
],
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'profile_image'=> asset('assets/images/profile-image.jpg'),
            'expertRecommends' => $expertRecommends,
            'matesExperts' => $request->user() ? Auth::user()->load(['zodiac', 'followings', 'followers']) : null,
            'zodiacs' => Zodiac::all(),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
