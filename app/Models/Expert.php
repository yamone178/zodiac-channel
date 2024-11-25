<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expert extends Model
{
    use HasFactory;

    protected $fillable = ['bio', 'about_me', 'expertise','profile_picture','dob','account_id'];


    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
