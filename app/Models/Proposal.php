<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $project_id
 * @property int $freelancer_id
 * @property string $cover_letter
 * @property numeric $bid_amount
 * @property int $bid_connects
 * @property string $status
 * @property int|null $estimated_days
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $freelancer
 * @property-read \App\Models\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereBidAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereBidConnects($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereCoverLetter($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereEstimatedDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereFreelancerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Proposal whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
