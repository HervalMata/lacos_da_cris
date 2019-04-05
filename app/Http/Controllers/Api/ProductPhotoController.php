<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Resources\ProductPhotoCollection;
use LacosDaCris\Http\Resources\ProductPhotoResource;
use LacosDaCris\Models\Product;
use LacosDaCris\Models\ProductPhoto;
use Illuminate\Http\Request;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Product $product
     * @return ProductPhotoCollection
     */
    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Collection
     */
    public function store(Request $request, Product $product)
    {
        return ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @param ProductPhoto $photo
     * @return ProductPhotoResource
     */
    public function show(Product $product, ProductPhoto $photo)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
        return new ProductPhotoResource($photo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \LacosDaCris\Models\ProductPhoto  $productPhoto
     * @return Response
     */
    public function update(Request $request, ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \LacosDaCris\Models\ProductPhoto  $productPhoto
     * @return Response
     */
    public function destroy(ProductPhoto $productPhoto)
    {
        //
    }
}
