<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Requests\ProductInputRequest;
use LacosDaCris\Http\Resources\ProductInputResource;
use LacosDaCris\Models\ProductInput;
use Illuminate\Http\Request;

class ProductInputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $inputs = ProductInput::with('product')->paginate();
        return ProductInputResource::collection($inputs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductInputRequest $request
     * @return Response
     */
    public function store(ProductInputRequest $request)
    {
        $input = ProductInput::create($request->all());
        $product = $input->product;
        $product->stock += $input->amount;
        $product->save();
        return ProductInputResource($input);
    }

    /**
     * Display the specified resource.
     *
     * @param ProductInput $input
     * @return Response
     */
    public function show(ProductInput $input)
    {
        return ProductInputResource($input);
    }
}
