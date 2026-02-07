<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id', 'title', 'description', 'category',
        'budget_type', 'budget_amount', 'status', 'experience_level', 'connects_required'
    ];

    // Added casts to handle JSON skills and currency
    protected $casts = [
        'skills_required' => 'array',
        'budget_amount' => 'decimal:2',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Get the proposals for this project.
     * FIXED: Removed 'job_id' to use the new 'project_id' column.
     */
    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%");
        })
        ->when($filters['min_budget'] ?? null, function ($query, $min) {
            $query->where('budget_amount', '>=', $min);
        })
        ->when($filters['max_budget'] ?? null, function ($query, $max) {
            $query->where('budget_amount', '<=', $max);
        });
    }
}
