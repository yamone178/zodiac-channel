<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use Illuminate\Support\Facades\Auth;


class ReviewController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request)
    {

        $review = new Review();
        $review->review_text = $request->review_text;
        $review->rating  = $request->rating;
        $review->expert_id = $request->expert_id;
        $review->user_id = Auth::user()->normalUser->id;


        $review->save();

        return redirect()->back()->with('message', 'Your review was saved successfully');
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
