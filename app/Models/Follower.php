<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    use HasFactory;

    protected $fillable = ['account_id', 'following_id'];


    // The account being followed
    public function followingAccount()
    {
        return $this->belongsTo(Account::class, 'following_id');
    }

    // The account that is following
    public function followerAccount()
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    // public function getProcessedProfilePictureAttribute()
    // {
    //     $profilePicture = $this->normalUser?->profile_picture 
    //         ?? $this->expert?->profile_picture;
    
    //     if ($profilePicture) {
    //         $pathInfo = pathinfo($profilePicture);
    //         return asset('storage/images/' . $pathInfo['basename']);
    //     }
    
    //     return null;
    // }
    

        public static function passFriendImage($friend)
        {
                // // Process normal user profile picture
                if ($profilePicture = $friend->normalUser?->profile_picture) {
                    $pathInfo = pathinfo($profilePicture);
                    //dd($pathInfo);
                    $filename = $pathInfo['basename'];
        
                    $friend->normalUser->profile_picture = asset('storage/images/' . $filename);
                }
            
                // Process expert profile picture if normal user's picture is not available
                if (!$profilePicture && $expertPicture = $friend->expert?->profile_picture) {
                    $pathInfo = pathinfo($expertPicture);
                    //dd($pathInfo);
                    $filename = $pathInfo['basename'];
        
                    $friend->expert->profile_picture = asset('storage/images/' . $filename);
                }
                
                
                return $friend; // Return the processed post
        
                
        }
}
