<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property int|null $country_id
 * @property int|null $state_id
 * @property int|null $city_id
 * @property string|null $address_line
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Country|null $country
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereAddressLine($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereStateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereUserId($value)
 * @mixin \Eloquent
 */
class Address extends Model
{
    // Allow mass assignment for these fields
    protected $fillable = ['user_id', 'country_id', 'city_id', 'state_id', 'address_line'];

    /**
     * Link back to the User (Freelancer)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Link to the Country (World Package)
     */
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
