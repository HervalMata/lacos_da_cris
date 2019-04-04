<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use LacosDaCris\Http\Controllers\Controller;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
