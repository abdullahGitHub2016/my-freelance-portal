<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Proposal extends Model
{
    protected $fillable = [
        'project_id', // <--- IMPORTANT: Add this!
        'freelancer_id',
        'cover_letter',
        'bid_amount',
        'estimated_days',
        'status'
    ];
    // In Proposal.php
    public function project(): BelongsTo
{
    // By removing the second argument, Laravel now looks for 'project_id' automatically
    return $this->belongsTo(Project::class);
}

    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }
}
