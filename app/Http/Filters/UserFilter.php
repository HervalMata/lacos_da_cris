<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 10/04/2019
 * Time: 17:35
 */

namespace LacosDaCris\Http\Filters;


use LacosDaCris\Models\User;
use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class UserFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search', 'role'];

    protected $simpleSorts = ['id', 'name', 'email', 'created_at'];

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%")
                    ->orWhere('email', 'LIKE', "%$value%");
    }

    protected function applyRole($value)
    {
        $role = $value == 'customer' ? User::ROLE_CUSTOMER : User::ROLE_SELLER;
        $this->query->where('role', $role);
    }

    public function hasFilterParameter()
    {
        $contains = $this->parser->getFilters()->contains(function ($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
        return $contains;
    }
}