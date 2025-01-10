<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Comment;
use App\Models\Expert;
use App\Models\Like;
use App\Models\Zodiac;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
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
        
        // Fetch posts with relevant relationships
        $posts = Post::whereIn('account_id', function ($query) {
            $query->select('following_id')
                ->from('followers')
                ->where('account_id', Auth::id());
        })
        ->orWhere('account_id', Auth::id())
        ->with(['zodiacs', 'account', 'likes','comments', 'account.normalUser', 'account.expert'])
        ->latest()
        ->get();
    
        // Fetch all zodiacs
        $zodiacs = Zodiac::all();    
        // Process posts
        $processedPosts = $posts->map(function ($post) {
           
            return Post::passProfileImage($post); // Return the processed post
        });


       

        return Inertia::render('Home/Home', [
            'posts' => $processedPosts,
            'zodiacs' => $zodiacs,
           
        ]);
    }



    public function allPosts()
    {
        $posts = Post::where('account_id', Auth::id())
        ->with(['zodiacs', 'account', 'likes', 'comments', 'account.normalUser', 'account.expert'])
        ->latest()
        ->get();
    
        $processedPosts = $posts->map(function ($post) {
            return Post::passProfileImage($post); // Return the processed post
        });

        return Inertia::render('Post/AllPost', ['posts'=> $processedPosts]);
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
        // dd($request->all());
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
           
        return redirect()->route('home')->with('message', 'Your post was created successfully!');

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {


        $post = Post::with(['zodiacs', 'likes',  'account', 'account.normalUser', 'account.expert', 'comments.account.normalUser', 'comments.account.expert'])->find($id);

        $processedPost = Post::passProfileImage($post);

        $comments = $processedPost->comments;
        $processedPost->comments = $comments->map(function ($comment) {
            return Post::passProfileImage($comment); // Return the processed post
        });

  
      
        return Inertia::render('Post/Show', ['post'=>$processedPost]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $post = Post::where('id', $id)->first();
        $post->caption = $request->data['caption'];
    
        // Decode the old images from the database
        $oldImages = json_decode($post->images, true) ?: []; // Ensure it's an array
        $updatedImages = $oldImages;
    
        // Handle deletion of images
        if (!empty($request->data['del_images'])) {
            $delImagesIndex = $request->data['del_images'];
    
            // Remove images by their indices
            $updatedImages = array_filter($updatedImages, function ($key) use ($delImagesIndex) {
                return !in_array($key, $delImagesIndex);
            }, ARRAY_FILTER_USE_KEY);
    
            // Reindex the array
            $updatedImages = array_values($updatedImages);
        }
    
        // Handle new images from the request
        if ($request->hasFile('data.images')) {
            foreach ($request->file('data.images') as $image) {
                if ($this->isPrivateUrl($image)) {
                    // Handle private URL logic if necessary
                    $updatedImages[] = $image;
                } else {
                    // Save new image to storage
                    $fileName = uniqid() . $image->getClientOriginalName();
                    $image->storeAs('public/images', $fileName);
                    $updatedImages[] = $fileName;
                }
            }
        }
    
        // Update the post's images with the final array
        $post->images = json_encode($updatedImages);
    
        // Update the account ID and save the post
        $post->account_id = Auth::id();
        $post->save();
    
        // Sync tagged zodiacs if provided
        if (!empty($request->data['tagged_zodiacs'])) {
            $post->zodiacs()->sync($request->data['tagged_zodiacs']);
        }
    
        return redirect()->back()->with('message', 'Post updated successfully!');
    }
    

    private function isPrivateUrl($image)
    {
        return filter_var($image, FILTER_VALIDATE_URL);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
      
        $post = Post::findOrFail($id);

        if ($post) {
            Like::where('post_id', $post->id)?->delete();
            Comment::where('post_id', $post->id)?->delete();
            $post->delete();
        }
      


        return redirect()->back()->with('message', 'Post Deleted successfully!');
    }
}
