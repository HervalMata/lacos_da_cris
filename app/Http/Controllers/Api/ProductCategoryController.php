<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Requests\ProductCategoryRequest;
use LacosDaCris\Models\Category;
use LacosDaCris\Models\Product;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return BelongsToMany
     */
    public function index(Product $product)
    {
        return $product->categories;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductCategoryRequest $request
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function store(ProductCategoryRequest $request, Product $product)
    {
        $changed = $product->categories()->sync($request->categories);
        $categiesAttachedId = $changed['attached'];
        /** @var Collection $categories */
        $categories = Category::whereIn('id', $categiesAttachedId)->get();
        return $categories->count() ? response()->json($categories, 201) : $categories;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @param Category $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product, Category $category)
    {
        $product->categories()->detach($category->id);
        return response()->json([], 204);
    }
}
