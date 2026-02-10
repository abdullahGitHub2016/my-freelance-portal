<?php

namespace App\Models;

use Nnjeim\World\Models\Country as BaseCountry;

/**
 * @property int $id
 * @property string $iso2
 * @property string $name
 * @property int $status
 * @property string $phone_code
 * @property string $iso3
 * @property string $region
 * @property string $subregion
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Nnjeim\World\Models\City> $cities
 * @property-read int|null $cities_count
 * @property-read \Nnjeim\World\Models\Currency|null $currency
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Nnjeim\World\Models\State> $states
 * @property-read int|null $states_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Nnjeim\World\Models\Timezone> $timezones
 * @property-read int|null $timezones_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country whereIso2($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country whereIso3($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country whereRegion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Country whereSubregion($value)
 * @mixin \Eloquent
 */
class Country extends BaseCountry
{
    /**
     * The package sometimes returns null for connection.
     * We force it to use your default DB connection.
     */
    public function getConnectionName(): string
    {
        return $this->connection ?? config('database.default');
    }
}
