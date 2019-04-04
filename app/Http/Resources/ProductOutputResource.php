<?php

namespace LacosDaCris\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductOutputResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this.id,
            'amount' => $this->amount,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'product' => new ProductResource($this->product)
        ];
    }
}
