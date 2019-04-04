<?php

use Illuminate\Database\Seeder;
use LacosDaCris\Models\Product;
use LacosDaCris\Models\ProductInput;

class ProductInputTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();
        factory(ProductInput::class, 150)
            ->make()
            ->each(function ($input) use ($products) {
                $product = $products->random();
                $input->product_id = $products->random()->id;
                $input->save();
                $product->stock += $input->amount;
                $product->save();
            });
    }
}
