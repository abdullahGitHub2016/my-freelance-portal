<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

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

    // A master scope to handle all incoming request filters
    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        })
            ->when($filters['experience_levels'] ?? null, function ($query, $levels) {
                // Handled as an array from the frontend checkboxes
                $query->whereIn('experience_level', $levels);
            })
            ->when($filters['budget_type'] ?? null, function ($query, $type) {
                $query->where('budget_type', $type);
            })
            ->when($filters['min_budget'] ?? null, function ($query, $min) {
                $query->where('budget_amount', '>=', $min);
            })
            ->when($filters['max_budget'] ?? null, function ($query, $max) {
                $query->where('budget_amount', '<=', $max);
            });
    }
}
