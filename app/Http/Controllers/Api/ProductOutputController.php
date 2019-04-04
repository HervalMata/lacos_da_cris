<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Requests\ProductOutputRequest;
use LacosDaCris\Http\Resources\ProductOutputResource;
use LacosDaCris\Models\ProductOutput;
use Illuminate\Http\Request;

class ProductOutputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $outputs = ProductOutput::with('product')->paginate();
        return ProductOutputResource::collection($outputs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductOutputRequest $request
     * @return ProductOutputResource
     */
    public function store(ProductOutputRequest $request)
    {
        $output = ProductOutput::create($request->all());
        return new ProductOutputResource($output);
    }

    /**
     * Display the specified resource.
     *
     * @param ProductOutput $output
     * @return \Illuminate\Http\Response
     */
    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }
}
