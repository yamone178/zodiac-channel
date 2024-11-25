<?php

namespace App\Http\Middleware;

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
        $user = $request->user() ? Auth::user()->load(['zodiac', 'expert', 'normalUser', 'followings']) : null;
        
        // Add expert image to the expert data if the user has an expert
        if ($user && $user->expert) {
            $user->expert->profile_picture_url = asset('storage/images/' . $user->expert->profile_picture);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user
            ],
            'followings' => $request->user() ? Auth::user()->load(['zodiac', 'followings']) : null,
            'zodiacs' => Zodiac::all(),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
