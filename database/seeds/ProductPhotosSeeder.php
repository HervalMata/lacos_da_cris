<?php

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use LacosDaCris\Models\Product;
use LacosDaCris\Models\ProductPhoto;

class ProductPhotosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var Collection $products */
        $products = Product::all();
        $this->deleteAllPhotosInProductsPath();
        $self = $this;
        $products->each(function ($product) {
            self::createPhotoDir($product);
        });
    }

    private function deleteAllPhotosInProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    private function createPhotoDir(Product $product)
    {
        $path = ProductPhoto::photosPath($product->id);
        \File::makeDirectory($path, 0777, true);
    }

    private function createPhotosModels(Product $product)
    {
        foreach (range(1, 5) as $v) {
            $this->createPhotoModel($product);
        }
    }

    private function createPhotoModel(Product $product)
    {
        ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'imagem.jpg'
        ]);
    }
}
