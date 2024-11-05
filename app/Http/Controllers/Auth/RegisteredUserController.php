<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\User;
use App\Models\Zodiac;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $zodiacs = Zodiac::all();
        return Inertia::render('Auth/Register', ['zodiacs'=>$zodiacs]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Account::class,
            'role'=>'required',
            
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Account::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'admin_id'=>1,
            'zodiac_id' => $request->zodiac,
            'password' => Hash::make($request->password),
        ]);

        $user->load('zodiac');

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
