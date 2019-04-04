<?php

use Faker\Generator as Faker;

$factory->define(LacosDaCris\Models\ProductInput::class, function (Faker $faker) {
    return [
        'amount' => $faker->numberBetween(1, 10)
    ];
});
