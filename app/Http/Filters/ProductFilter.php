<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 10/04/2019
 * Time: 17:35
 */

namespace LacosDaCris\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];

    protected $simpleSorts = ['id', 'name', 'price', 'created_at'];

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%")
                            ->orWhere('description', 'LIKE', "%$value%");
    }

    public function hasFilterParameter()
    {
        $contains = $this->parser->getFilters()->contains(function ($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
        return $contains;
    }
}