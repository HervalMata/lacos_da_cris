<?php

use Faker\Generator as Faker;

$factory->define(\LacosDaCris\Models\Category::class, function (Faker $faker) {
    return [
        'name' => $faker->colorName
    ];
});
