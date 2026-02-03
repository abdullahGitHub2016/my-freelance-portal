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
    // In Proposal.php
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id'); // Ensure foreign key matches
    }

    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }
}
