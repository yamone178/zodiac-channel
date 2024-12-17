<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $reviews = Review::with(['expert','user'])
        //             ->latest()->get();

        
        // $processedReviews = $reviews->map(function ($review) {
        //     $review->user->profile_picture_url = asset('storage/images/' . $review->user->profile_picture);
        // });

        // dd($processedReviews);

        // return Inertia::render('Profile/ViewAccount', ['reviews'=> $processedReviews]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request)
    {
    //     dd($request);
    //    Review::create([
    //     'review_text' => $request->review_text,
    //     'rating' => $request->rating,
    //     'expert_id'=> $request->expert_id,
    //     'user_id' => Auth::id()
    //    ]);

       $review = new Review();
       $review->review_text = $request->review_text;
       $review->rating  = $request->rating;
       $review->expert_id = $request->expert_id;
       $review->user_id = Auth::user()->normalUser->id;
        
     
       $review->save();

       return redirect()->back()->with('message', 'Your review was saved successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, $id)
    {
       $review = Review::findOrFail($id);
        $review->review_text = $request->data['review_text'];
        $review->rating = $request->data['rating'];
        $review->user_id = $request->data['user_id'];
        $review->expert_id = $request->data['expert_id'];
        $review->save();

        return redirect()->back()->with('message', 'Your review was updated successfully');


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    Review::find($id)->delete();
    // session()->flash('message', 'Item deleted successfully!');
    return redirect()->back()->with('message', 'Your review was deleted successfully');
}
}
