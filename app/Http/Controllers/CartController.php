<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItems;
use App\Http\Resources\CartItemsListResource;
use App\Http\Resources\ProductListResource;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Arr;

class CartController extends Controller
{
    public function index()
    {
        $query = CartItems::query();

        $cartItems = $query->get();
        $ids = Arr::pluck($cartItems, 'product_id');
        $products = Product::query()->whereIn('id', $ids)->get();
        return Inertia::render('Cart',[
            'cartItems' => CartItemsListResource::collection($cartItems),
            'products' => ProductListResource::collection($products),
        ]);
    }
}
