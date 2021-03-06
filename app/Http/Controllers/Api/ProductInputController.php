<?php

namespace LacosDaCris\Http\Controllers\Api;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use LacosDaCris\Http\Controllers\Controller;
use LacosDaCris\Http\Filters\ProductInputFilter;
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
        /** @var ProductInputFilter $filter */
        $filter = app(ProductInputFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = ProductInput::with('product')->filtered($filter);
        $inputs = $filterQuery->paginate();
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
        return new ProductInputResource($input);
    }

    /**
     * Display the specified resource.
     *
     * @param ProductInput $input
     * @return Response
     */
    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }
}
