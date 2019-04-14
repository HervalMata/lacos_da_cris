<?php

namespace LacosDaCris\Models;

use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class ProductOutput extends Model
{
    use Filterable;
    protected $fillable = ['amount', 'product_id'];

    /**
     * @return mixed
     */
    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }
}
