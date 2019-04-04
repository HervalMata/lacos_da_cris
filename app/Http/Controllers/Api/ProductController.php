<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Requests\ProductRequest;
use LacosDaCris\Http\Resources\ProductResource;
use LacosDaCris\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $products = Product::paginate(10);
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     * @return ProductResource
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh();
        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  \LacosDaCris\Models\Product  $product
     * @return ProductResource
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param  \LacosDaCris\Models\Product $product
     * @return ProductResource
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \LacosDaCris\Models\Product $product
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([], 204);
    }
}
