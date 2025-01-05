<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ExpertController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HoroscopeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
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
        'heroImg' => asset('assets/images/Picsart_25-01-01_23-36-52-945.png'),
        'bgImg' => asset('assets/images/bg.jpg'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/update-pf', [ExpertController::class, 'create'])->name('expert.create');

Route::post('/expert-register', [RegisteredUserController::class, 'expertStore'])->name('expert.register');


Route::middleware('auth')->group(function () {
  
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
 
    Route::get('/view-profile/{id}', [AccountController::class, 'view'])->name('account.view');

    // Route::get('/home', function () {
    //     return Inertia::render('Home/Home');
    // })->name('home');
    Route::middleware(['approved'])->group(function () {
        Route::get('/home', [PostController::class, 'index'])->name('home');
        Route::post('/home', [PostController::class, 'store'])->name('post.store');

    });
    // Route::get('/home/post', [PostController::class, 'create'])->name('post.create');
 
    Route::get('/post/{id}', [PostController::class, 'show'])->name('post.show');
    Route::get('/posts', [PostController::class, 'allposts'])->name('post.index');
    Route::patch('/post/{id}', [PostController::class, 'update'])->name('post.update');
    Route::delete('/post/{id}', [PostController::class, 'destroy'])->name('post.delete');


    Route::get('/horoscope',[HoroscopeController::class, 'index'])->name('horoscope');
    Route::get('/zodiac-mates',[FollowerController::class, 'create'])->name('zodiac-mate');
    Route::get('/your-zodiac-mates',[FollowerController::class, 'getZodiacsFriends'])->name('your-zodiac-mates');
    Route::get('/your-experts',[FollowerController::class, 'getExpertFriends'])->name('your-experts');

    Route::get('/experts',[FollowerController::class, 'expertFollow'])->name('expert');

    Route::post('/zodiac-mates', [FollowerController::class, 'store'])->name('zodiac-mates.store');

    Route::post('/zodiac-mates/{id}/follow', [FollowerController::class, 'follow'])->name('zodiac-mates.follow');
    Route::post('/zodiac-mates/{id}/unfollow', [FollowerController::class, 'unfollow'])->name('zodiac-mates.unfollow');
    Route::post('/post/{id}/like', [LikeController::class, 'toggleLike'])->name('post.like');

    Route::post('/post/{id}/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::patch('/comment/{id}', [CommentController::class, 'update'])->name('comment.update');    

    Route::patch('/profile/update', [UserController::class, 'update'])->name('user.update');
    Route::patch('/expert/update', [ExpertController::class, 'update'])->name('expert.update');

    Route::get('/profile/view', [ProfileController::class, 'view'])->name('profile.view');

    Route::post('/review', [ReviewController::class, 'store'])->name('review.store');
    Route::patch('/review/update/{id}', [ReviewController::class, 'update'])->name('review.update');
    Route::delete('/review/del/{id}', [ReviewController::class, 'destroy'])->name('review.delete');


    Route::get('/approve',[HomeController::class, 'approval'])->name('approve');

    // admin

  Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/home', [AdminController::class, 'home'])->name('home');
    Route::get('/experts', [AdminController::class, 'experts'])->name('experts');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::patch('/approve/{id}', [AdminController::class, 'approve'])->name('approve');
});
});



require __DIR__.'/auth.php';
