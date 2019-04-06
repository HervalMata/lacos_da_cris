<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Requests\ProductPhotoRequest;
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
     * @param ProductPhotoRequest $request
     * @param Product $product
     * @return ResponseFactory|Response
     * @throws \Exception
     */
    public function store(ProductPhotoRequest $request, Product $product)
    {
        $photos = ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
        return response()->json(new ProductPhotoCollection($photos, $product), 201);
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
        $this->assertProductPhoto($photo, $product);
        return new ProductPhotoResource($photo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Product $product
     * @param ProductPhoto $photo
     * @return ProductPhotoResource
     * @throws \Exception
     */
    public function update(Request $request, Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($photo, $product);
        $photo = $photo->updateWithPhoto($request->photo);
        return new ProductPhotoResource($photo);
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

    private function assertProductPhoto(ProductPhoto $photo, Product $product)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
    }
}
