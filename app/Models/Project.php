<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Country;

/**
 * @property int $id
 * @property int $client_id
 * @property string $title
 * @property string $description
 * @property string $category
 * @property string $budget_type
 * @property numeric|null $budget_amount
 * @property string $experience_level
 * @property string|null $duration
 * @property string $status
 * @property array<array-key, mixed>|null $skills_required
 * @property int $connects_required
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $country_id
 * @property-read \App\Models\User $client
 * @property-read Country|null $country
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Proposal> $proposals
 * @property-read int|null $proposals_count
 * @method static \Database\Factories\ProjectFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project filter(array $filters)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereBudgetAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereBudgetType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereConnectsRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereExperienceLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereSkillsRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Project extends Model
{
    use HasFactory;

    protected $fillable = [
    'client_id',
    'title',
    'description',
    'category',
    'budget_type',
    'budget_amount',
    'experience_level',
    'duration',
    'status',
    'skills_required',
    'connects_required',
    'country_id'
];

    // Added casts to handle JSON skills and currency
    protected $casts = [
        'skills_required' => 'array',
        'budget_amount' => 'decimal:2',
    ];

    /**
     * Get the country requirement for the project.
     */
    public function country()
    {
        // This links 'country_id' on your projects table to the countries table
        return $this->belongsTo(Country::class);
    }

    /**
     * Ensure you also have the client relationship defined
     */
    public function client()
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
