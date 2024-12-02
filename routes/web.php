<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ExpertController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\HoroscopeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/update-pf', [ExpertController::class, 'create'])->name('expert.create');

Route::post('/expert-register', [RegisteredUserController::class, 'expertStore'])->name('expert.register');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('/home', function () {
    //     return Inertia::render('Home/Home');
    // })->name('home');
    Route::get('/home', [PostController::class, 'index'])->name('home');
    // Route::get('/home/post', [PostController::class, 'create'])->name('post.create');
    Route::post('/home', [PostController::class, 'store'])->name('post.store');
    Route::get('/post/{id}', [PostController::class, 'show'])->name('post.show');

    Route::get('/horoscope',[HoroscopeController::class, 'index'])->name('horoscope');
    Route::get('/zodiac-mates',[FollowerController::class, 'create'])->name('zodiac-mate');

    Route::post('/zodiac-mates', [FollowerController::class, 'store'])->name('zodiac-mates.store');

    Route::post('/zodiac-mates/{id}/follow', [FollowerController::class, 'follow'])->name('zodiac-mates.follow');
    Route::post('/zodiac-mates/{id}/unfollow', [FollowerController::class, 'unfollow'])->name('zodiac-mates.unfollow');
    Route::post('/post/{id}/like', [LikeController::class, 'toggleLike'])->name('post.like');

    Route::post('/post/{id}/comment', [CommentController::class, 'store'])->name('comment.store');

    Route::patch('/profile/update', [UserController::class, 'update'])->name('user.update');
    Route::patch('/expert/update', [ExpertController::class, 'update'])->name('expert.update');

});



require __DIR__.'/auth.php';
