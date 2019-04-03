<?php

namespace LacosDaCris\Http\Controllers\Api;

use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * Display the specified resource.
     *
     * @param  \LacosDaCris\Models\Category  $modelsCategory
     * @return \Illuminate\Http\Response
     */
    public function show(Category $modelsCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \LacosDaCris\Models\Category  $modelsCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $modelsCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \LacosDaCris\Models\Category  $modelsCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $modelsCategory)
    {
        //
    }
}
