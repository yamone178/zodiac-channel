<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{

    public function toggleLike($postId)
    {
        $like = Like::where('account_id', Auth::id())
                ->where('post_id', $postId )->first();
    
        if ($like) {
           $like->delete(); 
         
        }
        else{
            Like::create([
                'account_id' => Auth::id(),
                'post_id' => $postId
            ]);           
        }

        return back();
    }
  
}
