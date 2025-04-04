<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        
        'caption',
        'images',
        'is_banned',
        'zodiac_id'
    ];


    public function zodiacs():BelongsToMany
    {
        return $this->belongsToMany(Zodiac::class);
    }

    public function account():BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }



    public static function passImages($postImages)
    {
        
        $images = json_decode($postImages);

        $imagePaths = explode(',', $postImages);
        
        // Convert each image path to a full URL
       return array_map(function ($imagePath) {
           
            return asset('storage/images/'.trim($imagePath)); // Adjust path as needed
        }, $images);
        
    }

    public static function passOneImage($postImage)
    {
        // Check if the image is already a full URL
        if (filter_var($postImage, FILTER_VALIDATE_URL)) {
            return $postImage;
        }
    
        // Generate the asset URL
        return asset('storage/images/' . $postImage);
    }

    public static function passProfileImage($post){
        if ($profilePicture = $post->account->normalUser?->profile_picture) {
            $pathInfo = pathinfo($profilePicture);
            //dd($pathInfo);
            $filename = $pathInfo['basename'];

             $post->account->normalUser->profile_picture = asset('storage/images/' . $filename);
        }
    
        // Process expert profile picture if normal user's picture is not available
        if (!$profilePicture && $expertPicture = $post->account->expert?->profile_picture) {
            $pathInfo = pathinfo($expertPicture);
            //dd($pathInfo);
            $filename = $pathInfo['basename'];

            $post->account->expert->profile_picture = asset('storage/images/' . $filename);
        }

        if ($post['images']) {
            $post['images'] = $post['images'] 
            ? self::passImages($post['images']) 
            : [];
        }

    

        return $post;
    }
}
