<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Zodiac;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $posts = Post::with(['zodiacs', 'account'])->get();
        $posts = Post::whereIn('account_id', function($query){
            $query->select('following_id')
            ->from('followers')
            ->where('account_id', Auth::id());

        })->with(['zodiacs', 'account','likes'])->latest()->get();

        $zodiacs = Zodiac::all();

        foreach ($posts as $post) {
            if ($post['images']) {
                
               $post['images'] = Post::passImages($post['images']);
            } else {
                // Set images to an empty array if none are available
                $post['images'] = [];
            }
        }

        
      
       
        
        return Inertia::render('Home/Home', ['posts'=>$posts, 'zodiacs'=> $zodiacs]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
        
        

        // return Inertia::render('Home/Home', ['zodiacs'=> $zodiacs]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
      
        $post = new Post();

        $post->caption = $request['caption'];


        // Save image
        
        $images = [];

        if ($request->hasFile('images')) {
         
            foreach ($request->file('images') as $image) {
                $fileName = uniqid().$image->getClientOriginalName();
                $image->storeAs('public/images', $fileName);
                
                // $image->move(public_path().'/images/',$fileName);
    
                $images[] = $fileName;
            }
        }
        $post->images = json_encode($images);

        $post->account_id = Auth::id();

        $post->save();

        // save tagged zodiacs 

        if ($request->has('tagged_zodiacs')) {
            $post->zodiacs()->attach($request['tagged_zodiacs']);
        }
        

       

      
        return redirect()->route('home');

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {


        $post = Post::with(['zodiacs', 'account'])->find($id);

        if ($post['images']) {
            // Split the comma-separated string into an array
           
           $post['images'] = Post::passImages($post['images']);
        } else {
            // Set images to an empty array if none are available
            $post['images'] = [];
        }
       
        return Inertia::render('Post/Show', ['post'=>$post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
