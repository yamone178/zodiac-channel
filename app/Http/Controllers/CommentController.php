<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use Illuminate\Support\Facades\Auth;


class CommentController extends Controller
{
   
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {
       Comment::create([
        'comment' => $request->comment,
        'post_id' => $request->post_id,
        'account_id' => Auth::id()
       ]);

       return redirect()->back()->with('message', 'Your Comment is created successfully!');
    }

 

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, $id)
    {
      
        $com = Comment::find($id);

     
        if ($request->data['comment']) {
           $com->comment = $request->data['comment'];

           $com->update();
        }

        return redirect()->back()->with('message', 'Comment is updated successfully!');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $com = Comment::find($id);

        $com->delete();
        return redirect()->back()->with('message', 'Comment is deleted successfully!');

    }
}
