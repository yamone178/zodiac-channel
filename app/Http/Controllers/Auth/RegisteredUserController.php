<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Expert;
use App\Models\User;
use App\Models\Zodiac;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        return Inertia::render('Auth/Register', ['zodiacs' => $zodiacs]);
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
            'email' => 'required|string|lowercase|email|max:255|unique:accounts,email',
            'role' => 'required',
            'zodiac' => 'required|exists:zodiacs,id',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Account::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'admin_id' => 1,
            'zodiac_id' => $request->zodiac,
            'password' => Hash::make($request->password),
        ]);

        if ($request->role === 'user') {
            $normalUser = new User();
            $normalUser->account_id = $user->id;
            $normalUser->save();
        }

        $user->load('zodiac');

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('home');
    }

    /**
     * Handle an incoming expert registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function expertStore(Request $request): RedirectResponse
    {
        $request->validate([
            'data.name' => 'required|string|max:255',
            'data.email' => 'required|string|lowercase|email|max:255|unique:accounts,email',
            'data.role' => 'required',
            'data.zodiac' => 'required|exists:zodiacs,id',
            'data.password' => ['required', 'confirmed', Rules\Password::defaults()],
            'data.profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'data.about_me' => 'required|string',
            'data.dob' => 'required|date',
            'data.no_of_exp' => 'required|integer|min:0',
            'data.expertise' => 'required|string',
            'data.bio' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            $results = $request->data;

            $user = Account::create([
                'name' => $results['name'],
                'email' => $results['email'],
                'role' => $results['role'],
                'admin_id' => 1,
                'zodiac_id' => $results['zodiac'],
                'password' => Hash::make($results['password']),
            ]);

            $user->load('zodiac');

            // Creating the Expert profile
            $expert = new Expert();
            $expert->bio = $results['bio'];
            $expert->about_me = $results['about_me'];
            $expert->expertise = $results['expertise'];
            $expert->dob = $results['dob'];
            $expert->account_id = $user->id;

            // Handling profile picture upload if provided
            if ($request->hasFile('data.profile_picture')) {
                $fileName = uniqid() . '.' . $request->file('data.profile_picture')->getClientOriginalExtension();
                $request->file('data.profile_picture')->storeAs('public/images', $fileName);
                $expert->profile_picture = $fileName; // Store the file path in the database
            }

            // Saving the expert profile
            $expert->save();

            // Fire the Registered event
            event(new Registered($user));

            // Auto-login the newly created user
            Auth::login($user);

            DB::commit();
            return redirect(RouteServiceProvider::HOME);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}