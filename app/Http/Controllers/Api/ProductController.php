<?php

namespace LacosDaCris\Http\Controllers\Api;

use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Requests\ProductRequest;
use LacosDaCris\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Database\Eloquent\Collection|Product[]
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());

        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param  \LacosDaCris\Models\Product  $product
     * @return Product
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param  \LacosDaCris\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();

        return response([], 204);
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

        return response([], 204);
    }
}
