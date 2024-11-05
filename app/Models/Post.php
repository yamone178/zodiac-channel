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


    public static function passImages($postImages)
    {
        
        $images = json_decode($postImages);

        $imagePaths = explode(',', $postImages);
        
        // Convert each image path to a full URL
       return array_map(function ($imagePath) {
            return asset('storage/' . trim($imagePath)); // Adjust path as needed
        }, $images);
        
    }
}
