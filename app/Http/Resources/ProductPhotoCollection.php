<?php

namespace LacosDaCris\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use LacosDaCris\Models\Product;

class ProductPhotoCollection extends ResourceCollection
{
    /**
     * @var Product
     */
    private $product;

    /**
     * ProductPhotoCollection constructor.
     * @param Product $product
     */
    public function __construct($resource, Product $product)
    {
        $this->product = $product;
        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'product' => new ProductResource($this->product),
            'photos' => $this->collection->map(function ($photo) {
                return new ProductPhotoResource($photo, true);
            })
        ];
    }
}
