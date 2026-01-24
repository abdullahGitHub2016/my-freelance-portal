<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'title',
        'description',
        'category',
        'budget_type',
        'budget_amount',
        'status',
    ];

    /**
     * Get the client (User) who posted the project.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Get the proposals for this project.
     * We explicitly name 'job_id' as the foreign key.
     */
    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class, 'job_id');
    }
}
