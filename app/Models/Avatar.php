<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avatar extends Model
{
    protected $fillable = ['avatar_path', 'user_id'];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
