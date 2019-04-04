<?php

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use LacosDaCris\Models\Category;
use LacosDaCris\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var Collection $categories */
        $categories = Category::all();
        factory(Product::class, 30)
            ->create()
            ->each(function (Product $product) use ($categories) {
                $categoryId = $categories->random()->id;
                $product->categories()->attach($categoryId);
            });
    }
}
