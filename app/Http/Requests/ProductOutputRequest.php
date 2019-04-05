<?php

namespace LacosDaCris\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use LacosDaCris\Models\Product;
use LacosDaCris\Rules\HasStock;

class ProductOutputRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $product = Product::findOrFail($this->product_id);
        /** @var Product $product */
        return [
            'amount' => ['required','integer', 'min:1', new HasStock($product)]
        ];
    }
}
