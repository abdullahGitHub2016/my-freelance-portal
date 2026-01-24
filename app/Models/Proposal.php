<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Proposal extends Model
{
    protected $fillable = [
    'job_id', // <--- IMPORTANT: Add this!
    'freelancer_id',
    'cover_letter',
    'bid_amount',
    'estimated_days',
    'status'
];
    public function projectListing(): BelongsTo
    {
        return $this->belongsTo(ProjectListing::class, 'job_id');
    }

    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }
}
