<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 10/04/2019
 * Time: 17:35
 */

namespace LacosDaCris\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class CategoryFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['id', 'name'];

    protected $simpleSorts = ['id', 'name', 'created_at'];
}