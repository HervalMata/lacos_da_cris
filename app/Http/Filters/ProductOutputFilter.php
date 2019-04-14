<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 10/04/2019
 * Time: 17:35
 */

namespace LacosDaCris\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductOutputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];

    protected $simpleSorts = ['id', 'product.name', 'created_at'];

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%");
    }

    protected function ApplySortProductName($order)
    {
        $this->query->orderBy('name', $order);
    }

    protected function ApplySortCreatedAt($order)
    {
        $this->query->orderBy('product_outputs.created_at', $order);
    }

    public function apply($query)
    {
        $query = $query->select('product_outputs.*')
                        ->join('products', 'products.id', '=', 'product_outputs.product_id');
        return parent::apply($query);
    }
}