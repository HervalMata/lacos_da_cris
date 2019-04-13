<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use LacosDaCris\Common\OnlyTrashed;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Filters\ProductFilter;
use LacosDaCris\Http\Requests\ProductRequest;
use LacosDaCris\Http\Resources\ProductResource;
use LacosDaCris\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use OnlyTrashed;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $filter = app(ProductFilter::class);
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        $filterQuery = $query->filtered($filter);
        $products = $filter->hasFilterParameter() ? $filterQuery->get() : $filterQuery->paginate(10);
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
     * @return Response
     * @throws \Exception
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([], 204);
    }

    /**
     * @param Product $product
     * @return JsonResponse
     */
    public function restore(Product $product)
    {
        $product->restore();
        return response()->json([], 204);
    }
}
